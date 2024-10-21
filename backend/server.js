const express = require("express");
const userRouter = require("./routes/userRoute");
const { PORT } = require("./config");
const adminRouter = require("./routes/adminRoutes");
const app = express();
const cors = require("cors");
const commonRouter = require("./routes/commonRoutes");

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/common", commonRouter)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
