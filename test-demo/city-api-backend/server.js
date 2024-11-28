import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Proxy Route for City API
app.get('/api/cities', async (req, res) => {
    const { name } = req.query;

    try {
        const response = await fetch(`${process.env.API_BASE_URL}?name=${name}`, {
            headers: {
                'X-Api-Key': process.env.API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from the third-party API.' });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
