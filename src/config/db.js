// import mongoose from 'mongoose'


// const connectDb = async()=>{
//     try {
//         console.log('check Strig',process.env.MONGOURI);
        
//         //  await mongoose.connect(process.env.MONGOURI);
//         //  console.log('mongo db connected');
//          mongoose.connect(process.env.MONGOURI)
//   .then(() => app.listen(PORT, () => console.log('Server running')))
//   .catch(err => console.error('DB Connection Error:', err));
//     } catch (error) {
//         console.log('error in db-->',error);
        
//     }
// }

// export default connectDb

import mongoose from 'mongoose';

const connectDB = async () => {
  // Agar pehle se connected hai toh dubara connect na karein
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGOURI, {
      bufferCommands: false, // Isko false karne se buffering timeout error nahi aayega
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

export default connectDB;
