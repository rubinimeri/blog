import express from 'express';
import routes from './routes/index.js';
import globalErrorHandler from './controllers/errorController.js'
import CustomError from "./utils/customError.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', routes.posts);
app.use('/posts/:postId', routes.messages);
app.use('/users', routes.users);

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404)
    next(err)
})
app.use(globalErrorHandler)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));