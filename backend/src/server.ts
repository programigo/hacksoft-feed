import app from "./app.ts";
import { connectDB } from "./config/db.ts";
import { env } from "./config/env.ts";

connectDB().then(() => {
    app.listen(env.PORT, () => {
        console.log("Server started on port", env.PORT);
    });
});