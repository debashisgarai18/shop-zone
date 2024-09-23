const express = require('express');
const useRouter = require('./routes/userRoute');
const { PORT } = require('./config');
const app = express();

app.use(express.json());
app.use("/user", useRouter);

 
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
