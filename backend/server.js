const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3("http://127.0.0.1:8545"); // Ganache
const contractABI = [{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "anomalies",
    "outputs": [
        {
            "internalType": "string",
            "name": "meterId",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "anomalyType",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
},
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_meterId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_type",
                "type": "string"
            }
        ],
        "name": "storeAnomaly",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }];
const contractAddress = "0x152569b88D0554E66D6eEEe07375DE9d49eea46f";

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post("/report-anomaly", async (req, res) => {
    try {
        const { meter_id, type } = req.body;
        const accounts = await web3.eth.getAccounts();

        await contract.methods
            .storeAnomaly(meter_id, type)
            .send({ from: accounts[0], gas: 300000 });

        console.log("✅ Anomaly stored on blockchain");
        res.json({ status: "stored" });

    } catch (error) {
        console.error("Store error:", error.message);
        res.status(500).json({ error: "Failed to store anomaly" });
    }
});


app.get("/get-anomalies", async (req, res) => {
    try {
        const count = await contract.methods.getCount().call();
        res.json({ count });
    } catch (error) {
        console.error("Blockchain error:", error.message);
        res.status(500).json({ error: "Blockchain not reachable" });
    }
});


app.listen(5000, () => {
    console.log("🚀 Backend running on port 5000");
});
