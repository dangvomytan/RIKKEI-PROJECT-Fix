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

const app: Express = express();
const router = express.Router();

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

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
