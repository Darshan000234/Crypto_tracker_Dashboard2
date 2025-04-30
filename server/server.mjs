import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

// ✅ Route 1: Get 100 Coins
app.get("/api/100-coins", async (req, res) => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 100,
                page: 1,
                sparkline: false,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching 100 coins:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// ✅ Route 2: Get Coin Data
app.get("/api/coin-data/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error);
        res.status(500).json({ error: "Failed to fetch coin data" });
    }
});

// ✅ Route 3: Get Coin Prices
app.get("/api/coin-prices/:id", async (req, res) => {
    const { id } = req.params;
    const { days } = req.query;  // Number of days for historical data

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
                vs_currency: "usd",
                days: days,
                interval: "daily",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching price data for ${id}:`, error);
        res.status(500).json({ error: "Failed to fetch price data" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Proxy running on port ${PORT}`);
});
