import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRoute from './route/book.route.js'
import cors from 'cors'
import userRouter from './route/user.roure.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


//const PORT = process.env.PORT || 4000


//MongoDb Connection
  // mongoose.connect(process.env.MONGODB_URL,{dbName:"readyforread_db"})
  // .then(() => console.log("Database connected."))
  // .catch(error => console.log("Database connection faild", error))

  let isConnected = false;
  async function connectToMongoDB(){
    try {
      await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      });
      isConnected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

app.use(async (req, res, next) => {
  if(!isConnected){
    connectToMongoDB()
  }
  next();
});

//defining route
app.use("/book",bookRoute)
app.use("/user",userRouter)
app.use("/user",userRouter)

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`)
// })

module.exports = app;