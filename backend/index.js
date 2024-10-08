import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
// import from
// import userRoutes from
// index.js file (branch main );
import orderRoutes from './routes/orderRoute.js'
import uploadRoutes from './routes/uploadRoutes.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from 'cors';
const app = express();
app.use(cors({ origin: 'https://tosh-mart.vercel.app' }));

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//APIs
app.get("/", (req, res) => {
    res.send("working totaly fine");
})
app.use('/api/users', userRoutes);
app.use('/api/catogory', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


app.listen(port, () => console.log(`server running on port.. ${port}`));