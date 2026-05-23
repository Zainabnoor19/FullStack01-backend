import mongoose from 'mongoose'


const connectDb = async()=>{
    try {
        console.log('check Strig',process.env.MONGOURI);
        
        //  await mongoose.connect(process.env.MONGOURI);
        //  console.log('mongo db connected');
        await mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log('Server running')))
  .catch(err => console.error('DB Connection Error:', err));
    } catch (error) {
        console.log('error in db-->',error);
        
    }
}

export default connectDb