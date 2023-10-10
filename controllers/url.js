const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res) {
    const shortID = shortid()
    const body = req.body;

    if (!body.url) return res.status(400).json({
        err: "URL is Required"
    })
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });
    return res.json({ id: shortID })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    })
}


module.exports = {
    handleGenerateNewShortURL, handleGetAnalytics
}