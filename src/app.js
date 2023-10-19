require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const packageRoute = require('./routes/packageRoute');
const transactionRoute = require('./routes/transactionRoute');
const reservationRoute = require('./routes/reservationRoute');

const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/not-found');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));


app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/packages', packageRoute);
app.use('/', transactionRoute);
app.use('/reserve', reservationRoute);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`))