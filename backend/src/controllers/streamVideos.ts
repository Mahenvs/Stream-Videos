import { Response, Request } from "express";
import fs from "fs";
import path from "path";

export const savedVideoController = async (req: Request, res: Response): Promise<void> => {
    try {

        const videoPath = process.cwd() + "\\uploads\\" + req.params.videoId;
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            console.log("range specified ", range);

        }
        if (!range) {
            console.log("No range specified");

            res.writeHead(200, {
                "Content-Type": "video/mp4",
                "Content-Length": fileSize
            });
            fs.createReadStream(videoPath).pipe(res);
            return;
        }

        // Handle Range Requests (Chunked Streaming)
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        // Create video stream for the requested range
        const file = fs.createReadStream(videoPath, { start, end });

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
            "Cache-Control": "public, max-age=3600"
        });

        // Pipe the video stream to response
        file.pipe(res);

        // Handle errors
        file.on("error", (err) => {
            console.error("Stream error:", err);
            res.end();
        });

        res.on("close", () => {
            console.log("Connection closed by client");
            file.destroy();
        });

    } catch (error) {
        console.error("Error serving video:", error);
        res.status(500).json({ message: "Error serving video." });
    }
};
