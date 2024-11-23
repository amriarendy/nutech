import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./app/routes/AuthRoute.js";
import ProfileRoute from "./app/routes/ProfileRoute.js";
import BannerRoute from "./app/routes/BannerRoute.js";
import ServiceRoute from "./app/routes/ServiceRoute.js";
import TransactionRoute from "./app/routes/TransactionRoute.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(AuthRoute);
app.use(ProfileRoute);
app.use(BannerRoute);
app.use(ServiceRoute);
app.use(TransactionRoute);

app.listen(port, () => {
  console.log(`Server running | app listening at http://127.0.0.1:${port}`);
});
