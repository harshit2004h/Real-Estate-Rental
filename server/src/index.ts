import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { AuthMiddleware } from "./middlewares/authMiddleware";

/*ROUTE IMPORTS*/
import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import paymentRoutes from "./routes/paymentRoutes";

/*CONFIGURATION*/
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*ROUTES*/
app.get("/", (req: Request, res: Response): void => {
  res.send("This is home route");
});

app.use("/applications", applicationRoutes);
app.use("/properties", propertyRoutes);
app.use("/leases", leaseRoutes);
app.use("/tenants", AuthMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", AuthMiddleware(["manager"]), managerRoutes);
app.use("/payments", paymentRoutes);

/*SERVER*/
const PORT: number = Number(process.env.PORT) || 3002;
app.listen(PORT, "0.0.0.0", (): void => {
  console.log(`Server is running on port ${PORT}`);
});
