
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const CUSTOMGPT_API_KEY = process.env.CUSTOMGPT_API_KEY;
const CUSTOMGPT_AGENT_ID = process.env.CUSTOMGPT_AGENT_ID;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.SpeechResult || req.body.text;

    try {
        const response = await axios.post(
            `https://app.customgpt.ai/api/v1/chat/${CUSTOMGPT_AGENT_ID}`,
            {
                input: userMessage
            },
            {
                headers: {
                    'Authorization': `Bearer ${CUSTOMGPT_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = response.data.response;
        res.json({ reply });
    } catch (error) {
        console.error(error?.response?.data || error.message);
        res.status(500).json({
            reply: "Désolée, une erreur est survenue. Veuillez consulter notre site ou nous écrire."
        });
    }
});

app.listen(port, () => {
    console.log(`CustomGPT FINAL API server running on port ${port}`);
});
