import { Response, Request } from "express";

export const UploadVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return
        }
        // Send response with the uploaded file
        res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file.' });
    }
};
