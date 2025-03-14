import path from "node:path";
import e from "express";
import { loadRoutes } from "../utils/routerUtils";

const app = e();
app.use(e.json());

const publicRouter = e.Router();
const privateRouter = e.Router();

const publicPath = path.join(__dirname, "public");
const privatePath = path.join(__dirname, "private");

loadRoutes(publicRouter, publicPath, false);
loadRoutes(privateRouter, privatePath, true);

app.use("/api", publicRouter);
app.use("/api/admin", privateRouter);

export default app;