import mongoose from "mongoose";
import colors from "colors";
import { exit } from "process";
export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${ connection.host }:${ connection.port }`
        console.log(colors.bgBlue.bold(`MongoDB connected: ${url}`));
    } catch (error) {
        console.log(colors.bgRed.bold(`Error al conectarse a MongoDB`));
        exit(1);
    }
}