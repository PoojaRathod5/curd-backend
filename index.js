const express = require("express")
const app = express()
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes");
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config();
const cors = require("cors")
app.use(express.json())
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);


app.listen(process.env.port, async () => {
    try {
        await connection; // connection to mongodb atlas
        console.log("Connected to db");
    } catch (err) {
        console.log("connection to db failed");
        console.log(err);
    }
    console.log(`Running the server at port ${process.env.port} `); //confirmation from server
})