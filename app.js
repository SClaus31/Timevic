// Import Express.js
const express = require('express');

// Import OpenAI
const OpenAI = require("openai");

// Create a pendingTasks object to store the pending tasks
const pendingTasks = {};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

const systemPrompt = `
You are a planning assistant.

You maintain and update a task JSON through conversation.

You will receive:
- User input
- Current task JSON (or null)

Your job:
1. Update the task JSON
2. Decide if the task is complete

Response format:

If incomplete:
{
  "task": { ... },
  "complete": false,
  "question": "your follow-up question"
}

If complete:
{
  "task": { ... },
  "complete": true
}

Rules:
- Be smart and infer when possible
- Ask only ONE short, natural question if needed
- Never explain
- Always return valid JSON only
`;

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



app.post('/', async (req, res) => {
  console.log("Incoming webhook:", JSON.stringify(req.body, null, 2));

  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return res.sendStatus(200);

    const from = message.from;
    const userInput = message.text?.body;

    if (!userInput) return res.sendStatus(200);

    const currentTask = pendingTasks[from]?.task || null;

const aiResponse = await openai.responses.create({
  model: "gpt-4.1",
  input: [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `
User input: ${userInput}

Current task JSON:
${JSON.stringify(currentTask)}
`
    }
  ]
});

const aiText = aiResponse.output[0].content[0].text;

let result;
try {
  result = JSON.parse(aiText);
} catch (e) {
  await sendWhatsAppMessage(from, "Sorry, I didn't understand that.");
  return res.sendStatus(200);
}

if (!result.complete) {
  pendingTasks[from] = { task: result.task };

  await sendWhatsAppMessage(from, result.question);
  return res.sendStatus(200);
}

// ✅ COMPLETE
delete pendingTasks[from];

await sendWhatsAppMessage(
  from,
  `Got it ✅\n\n${JSON.stringify(result.task, null, 2)}`
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

