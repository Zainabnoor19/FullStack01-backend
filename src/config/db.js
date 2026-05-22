import mongoose from 'mongoose'


const connectDb = async()=>{
    try {
        console.log('check Strig',process.env.MONGOURI);
        
         await mongoose.connect(process.env.MONGOURI);
         console.log('mongo db connected');
         
    } catch (error) {
        console.log('error in db-->',error);
        
    }
}

export default connectDb