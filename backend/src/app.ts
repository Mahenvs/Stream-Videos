import cors from "cors";
import express from 'express';
import router from "./Routes/videoRoutes";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api", router);


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});