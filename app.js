// Import Express.js
const express = require('express');

// Import OpenAI
const OpenAI = require("openai");

// Create a pendingTasks object to store the pending tasks
const pendingTasks = {};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a conversations object to store the conversation history
const conversations = {};

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

const systemPrompt = `
You are a planning assistant.

Your job:
1. Classify the user input into one of:
   - event
   - task
   - block
   - habit

2. Extract into JSON with this schema:

{
  "type": "event | task | block | habit",
  "title": "string",
  "duration_minutes": number | null,
  "deadline": string | null,
  "start_time": string | null,
  "recurrence": string | null,
  "total_duration_minutes": number | null
}

3. Always return JSON ONLY.

4. If information is missing, still return JSON with null values.

Do not ask questions.
Do not explain anything.
`;


function getMissingField(task) {
  switch (task.type) {
    case "event":
      if (!task.start_time) return "start_time";
      if (!task.duration_minutes) return "duration_minutes";
      break;

    case "task":
      if (!task.duration_minutes) return "duration_minutes";
      break;

    case "block":
      if (!task.total_duration_minutes) return "total_duration_minutes";
      if (!task.deadline) return "deadline";
      break;

    case "habit":
      if (!task.recurrence) return "recurrence";
      if (!task.duration_minutes) return "duration_minutes";
      break;
  }
  return null;
}

function fillMissingField(task, field, userInput) {
  switch (field) {
    case "duration_minutes":
      task.duration_minutes = extractNumber(userInput);
      break;

    case "total_duration_minutes":
      task.total_duration_minutes = extractNumber(userInput);
      break;

    case "deadline":
      task.deadline = userInput; // improve later with date parsing
      break;

    case "start_time":
      task.start_time = userInput;
      break;

    case "recurrence":
      task.recurrence = userInput;
      break;
  }

  return task;
}

function extractNumber(text) {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

function getFollowUpQuestion(field) {
  switch (field) {
    case "duration_minutes":
      return "How long will this take?";
    case "start_time":
      return "When should this happen?";
    case "deadline":
      return "When is the deadline?";
    case "total_duration_minutes":
      return "How many hours will this take in total?";
    case "recurrence":
      return "How often should this happen?";
    default:
      return null;
  }
}

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
// app.post('/', (req, res) => {
//   const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
//   console.log(`\n\nWebhook received ${timestamp}\n`);
//   console.log(JSON.stringify(req.body, null, 2));
//   res.status(200).end();
// });

app.post('/', async (req, res) => {
  console.log("Incoming webhook:", JSON.stringify(req.body, null, 2));

  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) return res.sendStatus(200);

    const from = message.from;
    const userInput = message.text?.body;

    // 🔁 FOLLOW-UP FLOW
    if (pendingTasks[from]) {
      let { task, missingField } = pendingTasks[from];

      task = fillMissingField(task, missingField, userInput);

      const nextMissing = getMissingField(task);

      if (nextMissing) {
        pendingTasks[from] = { task, missingField: nextMissing };

        const question = getFollowUpQuestion(nextMissing);
        await sendWhatsAppMessage(from, question);

        return res.sendStatus(200);
      }

      // ✅ COMPLETE
      delete pendingTasks[from];

      await sendWhatsAppMessage(
        from,
        `Got it ✅\n\n${JSON.stringify(task, null, 2)}`
      );

      return res.sendStatus(200);
    }

    // 🧠 NEW TASK → OpenAI
    const aiResponse = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput }
      ]
    });

    const aiText = aiResponse.output[0].content[0].text;

    let task;
    try {
      task = JSON.parse(aiText);
    } catch (e) {
      await sendWhatsAppMessage(from, "Sorry, I didn't understand that.");
      return res.sendStatus(200);
    }

    const missingField = getMissingField(task);

    if (missingField) {
      pendingTasks[from] = { task, missingField };

      const question = getFollowUpQuestion(missingField);
      await sendWhatsAppMessage(from, question);

      return res.sendStatus(200);
    }

    // ✅ COMPLETE
    await sendWhatsAppMessage(
      from,
      `Got it ✅\n\n${JSON.stringify(task, null, 2)}`
    );

    return res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function sendWhatsAppMessage(to, body) {
  await fetch(
    `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        text: { body }
      }),
    }
  );
}

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
