require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute')
const classRoute = require('./routes/classRoute');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/not-found');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


app.use('/auth', authRoute);
app.use('/post', classRoute);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`))