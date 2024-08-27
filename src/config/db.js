import mongoose from "mongoose"

export const connectDB = async(uri)=>{
    try {
        await mongoose.connect(uri);
        console.log("connect  to db")
    } catch (error) {
        console.log(error);
    }
}

//sql: mysql, postgresql, sqlServer =>TypeORM
//onsql: mongoose, oracle =>ODM 