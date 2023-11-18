const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();
const uploadRouter = require('./Router/uploadRouter');
const authRouter = require('./Router/authRouter');
const productRouter = require('./Router/productRouter')
const categoryRouter = require('./Router/categoryRouter')
const itemRouter = require('./Router/ItemRouter')
const userRouter = require('./Router/userRouter')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000; 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/user', userRouter);
app.use('/uploads', uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting the server: ${err.message}`);
});

