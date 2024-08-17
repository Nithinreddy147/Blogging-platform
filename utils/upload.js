

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'

dotenv.config();

const Username = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url : `mongodb://${Username}:${Password}@blog-app-shard-00-00.vonxz.mongodb.net:27017,blog-app-shard-00-01.vonxz.mongodb.net:27017,blog-app-shard-00-02.vonxz.mongodb.net:27017/?ssl=true&replicaSet=atlas-dxce9h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    options: {useNewUrlParser : true},
    file: (request,file) => {
        const match = ['image/png','image/jpeg','image/jpg'];

        if (match.indexOf(file.mimeType===-1)) {
            return `${Date.now()}-blog-${file.originalname}`
        }

        return {
            bucketName: "photos",
            fileName: `${Date.now()}-blog-${file.originalname}`
        }
    }
})


export default multer({storage});