const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();

const authRouter = require('./Router/authRouter');
const productRouter = require('./Router/productRouter');
const categoryRouter = require('./Router/categoryRouter');
const itemRouter = require('./Router/ItemRouter');
const userRouter = require('./Router/userRouter');
const uploadRouter = require('./Router/uploadRouter');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
console.log(PORT, 'PORT');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/uploads', uploadRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting the server: ${err.message}`);
});
