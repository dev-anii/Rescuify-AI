import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Groq Client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Rescuify AI Core Engine Operational.');
});

// The core AI Triage Endpoint
app.post('/api/triage', async (req, res) => {
  const { textMessage } = req.body;

  if (!textMessage) {
    return res.status(400).json({ error: "Emergency text context is required." });
  }

  try {
    // Call Groq API using Llama 3 for structured extraction
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert emergency triage AI. Analyze the incoming emergency message and return a JSON object. 
          Do not include any chat prose, introductions, markdown wrappers, or explanations. Return ONLY raw JSON matching this format:
          {
            "urgency": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
            "category": "Medical" | "Fire" | "Disaster" | "Accident" | "Other",
            "extracted_location": "String value of location mentioned, or 'Unknown'",
            "recommended_action": "Short action instruction for first responders"
          }`
        },
        {
          role: "user",
          content: `Triage this urgent report: "${textMessage}"`
        }
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.1, // Low temperature forces high consistency and accuracy
      response_format: { type: "json_object" } // Hard forces a clean JSON output
    });

    // Parse the structured text string from the model response into a real JSON object
    const triageResult = JSON.parse(chatCompletion.choices[0].message.content);
    
    res.json({
      success: true,
      data: triageResult
    });

  } catch (error) {
    console.error("AI Triage Processing Error:", error);
    res.status(500).json({ error: "Failed to process structural emergency triage via AI core." });
  }
});

app.listen(PORT, () => {
  console.log(`AI Backend Server is running on port ${PORT}`);
});