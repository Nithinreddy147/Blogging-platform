import mongoose from "mongoose"


const Connection = async (Username, Password) => {
    const URL = `mongodb://${Username}:${Password}@blog-app-shard-00-00.vonxz.mongodb.net:27017,blog-app-shard-00-01.vonxz.mongodb.net:27017,blog-app-shard-00-02.vonxz.mongodb.net:27017/?ssl=true&replicaSet=atlas-dxce9h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    try {
        await mongoose.connect(URL, {useNewUrlParser: true});
        console.log('Database connected Successfully');
    } catch (error) {
        console.log('Error while connecting with database ', error);
    }
}

export default Connection;