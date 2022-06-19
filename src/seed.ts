import 'reflect-metadata';
import {AppDataSource} from './data-source';

AppDataSource.initialize().then(async (connection) => {
  await connection.destroy()
}).catch(error => console.log(error));
