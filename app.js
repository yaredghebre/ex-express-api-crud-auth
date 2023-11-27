const express = require("express");
const dotenv = require("dotenv");
// const path = "path";

const postsRouter = require("./routers/postsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const tagsRouter = require("./routers/tagsRouter");
const usersRouter = require("./routers/usersRouter");

const routeNotFound = require("./middlewares/routeNotFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();

let port = +process.env.PORT || 3001;

dotenv.config();

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);
app.use("", usersRouter);

app.use(routeNotFound);

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
