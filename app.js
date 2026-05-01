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

Your goal is to create a schedulable task JSON — NOT to fully understand the task itself.

You will receive:
- User input
- Current task JSON (or null)

You must ONLY care about filling these fields:

{
  "type": "event | task | block | habit",
  "title": "string",
  "duration_minutes": number | null,
  "deadline": string | null,
  "start_time": string | null,
  "recurrence": string | null,
  "total_duration_minutes": number | null
}

---

Your job:
1. Update the JSON with new info
2. Decide if it is schedulable (complete enough)

---

A task is COMPLETE when:
- event → has start_time + duration_minutes
- task → has duration_minutes (deadline optional but preferred)
- block → has total_duration_minutes + deadline
- habit → has recurrence + duration_minutes

---

IMPORTANT RULES:

- ONLY ask about missing required scheduling fields
- NEVER ask follow-ups that are not in the schema
- Ask EXACTLY ONE short question if needed
- Prefer the most critical missing field

- Infer when obvious:
  - "Friday" → deadline or start_time
  - "30 min" → duration_minutes

---

Response format:

If incomplete:
{
  "task": { ... },
  "complete": false,
  "question": "short question about ONE missing field"
}

If complete:
{
  "task": { ... },
  "complete": true
}

---

NEVER explain.
RETURN JSON ONLY.
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

