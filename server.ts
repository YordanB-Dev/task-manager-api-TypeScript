import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const portEnv = process.env.PORT;
const PORT = portEnv ? Number(portEnv) : 3000;

if (Number.isNaN(PORT) || PORT <= 0) {
    throw new Error(`Invalid PORT value. Set process.env.PORT to a positive number.`);
};

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});