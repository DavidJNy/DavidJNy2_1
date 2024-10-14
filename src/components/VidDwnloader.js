import React, { useState } from "react";
import axios from "axios";

function VidDwnloader() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    setStatus("Processing...");
    try {
      const response = await axios.post(
        "/api/viddownload",
        { url },
        { responseType: "blob" }
      );

      // Create a download link for the file
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "video_playlist.m3u8");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatus("Download complete");
    } catch (error) {
      setStatus("Failed to download m3u8 file");
    }
  };

  return (
    <div id="VidDownloader">
      <h1>m3u8 Downloader</h1>
      <input
        type="text"
        placeholder="Enter video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
      <p>{status}</p>
    </div>
  );
}

export default VidDwnloader;
