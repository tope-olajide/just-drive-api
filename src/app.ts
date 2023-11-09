import express from "express";
require("dotenv").config();
import cors from "cors";
import bodyParser from "body-parser";
import Ably from 'ably/promises';


const app = express();

const corsOptions = {
  origin: [
        "http://localhost:8888",
      "https://just-drive.netlify.app"
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get('/token', async (req, res) => {
    const client = new Ably.Realtime(process.env.ABLY_CONNECTION_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({
        clientId: "host",
    });
    console.log({ tokenRequestData });
    res.send(tokenRequestData)
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {

  console.log(`Server is running on port ${PORT}`);
});
