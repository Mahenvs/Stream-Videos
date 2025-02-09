import { Request, Response } from "express";
import fs from "fs"

export const listOfVideosController = async (req: Request, res: Response) => {
    try {
        const files = fs.readdirSync(process.cwd() + '/uploads');
        console.log(files);
        res.status(200).json({
            message: "Total Videos Fetched, hover on each file to stream ",
            videos: files,
            count: files.length
        });

    } catch (error) {
        res.status(500).json({ message: "Error loading videos." });

    }
}