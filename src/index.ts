import 'reflect-metadata'
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log('typeorm');
}).catch(error => console.log(error))
