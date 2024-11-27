import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import globalErrorHandler from './controllers/errorController.js'
import CustomError from "./utils/customError.js";
const app = express();

app.use(cors())
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/posts', routes.comments);
app.use('/posts', routes.posts);
app.use('/users', routes.users);
app.use('/auth', routes.auth);

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404)
    next(err)
})
app.use(globalErrorHandler)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));