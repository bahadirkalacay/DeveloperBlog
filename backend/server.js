const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const cors = require("cors")
const dotenv = require("dotenv");
const userRoutes = require("./route/users/usersRoute");
const app = express();
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const postRoute = require("./route/posts/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const categoryRoute = require("./route/category/categoryRoute");
const path = require("path");


dotenv.config();
dbConnect();

app.use(express.static(path.join(__dirname, "public/images")))
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoutes);
app.use("/api/category", categoryRoute);
app.use(errorHandler);
app.use(notFound);

app.get("/", (req,res)=>{
    res.send("Welcome")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running ${PORT}`));
