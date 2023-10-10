const express = require("express");
const UrlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require('./models/url')
const app = express();
const PORT = 3000;

//DateBase Connection
connectToMongoDB("mongodb://127.0.0.1:27017/URLShortner")
    .then(() => console.log("MongoDB Connected"))
    .catch((e) => console.log("error ->", e));

//Utilities
app.use(express.json());
app.use("/url", UrlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
  const entry =  await URL.findOneAndUpdate(
        { shortId },
        {
            $push: { visitedHistory: { timestamps: Date.now() } },
        }
    );
    res.redirect(entry.redirectURL);
});

//Listening
app.listen(PORT, () => {
    console.log("Server Started at PORT", PORT);
});
