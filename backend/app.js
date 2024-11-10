import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use('/posts', routes.posts);
app.use('/messages', routes.messages);
app.use('/users', routes.users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));