import express, { Express, Response, Request } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";



import categoryRouter from './routers/category.Router'
import productRouter from './routers/product.Router'
import versionRouter from './routers/version.Router'
import adminRouter from './routers/admin.Router'
import userRouter from './routers/user.Router'
import orderRouter from './routers/order.Router'
import orderDetailRouter from './routers/orderDetail.Router'
import cartRouter from './routers/cart.Router'
import cartItemRouter from './routers/cartItem.Router'
import cookieParser from 'cookie-parser';

const app: Express = express();
const router = express.Router();

const corsOrigin = [
  // 'https://nike-ten-mu.vercel.app',
  // 'https://nike-tfgk.vercel.app',
  'http://localhost:3000',
  'http://localhost:4000',
];


//middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const corsOptions = {
  origin: corsOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Router
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/version',versionRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/order-detail',orderDetailRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/cart-item',cartItemRouter)

app.use((req:any,res:any,next)=>{
    console.log(res);
    console.log(req);
    const errors = createError(404,'Not Found');
    next(errors);
  })

export default app;
