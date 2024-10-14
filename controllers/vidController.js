// videoController.js
const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Function to download the m3u8 file
exports.downloadNewVid = async (req, res) => {
  const { url } = req.body;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Intercept network requests
    let m3u8Url = null;
    page.on("request", (request) => {
      const requestUrl = request.url();
      if (requestUrl.includes(".m3u8")) {
        m3u8Url = requestUrl;
      }
      request.continue();
    });

    // Enable request interception
    await page.setRequestInterception(true);

    // Go to the URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Optionally, you can add code here to click a play button if needed
    // await page.click('button.play-button'); // Example selector, change as needed

    // Wait for some time to catch the m3u8 request
    await page.waitForTimeout(5000);

    // Close the browser
    await browser.close();

    // If m3u8 URL is not found, return an error
    if (!m3u8Url) {
      return res.status(404).json({ message: "m3u8 URL not found" });
    }

    // Download the m3u8 file using Axios
    const response = await axios.get(m3u8Url);
    const m3u8Content = response.data;

    // Send the m3u8 file content back to the client
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="video_playlist.m3u8"`
    );
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(m3u8Content);
  } catch (error) {
    console.error("Failed to process the video download:", error);
    res
      .status(500)
      .json({ message: "Failed to download m3u8 file", error: error.message });
  }
};
