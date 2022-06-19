import 'reflect-metadata';
import {AppDataSource} from './data-source';
import {Post} from './entity/Post';

AppDataSource.initialize().then(async (connection) => {
  const posts = await connection.manager.find(Post);
  if (posts.length === 0) {
    await connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => {
      return new Post({title: `Post ${n}`, content: `第${n}篇文章`});
    }));
  }
  await connection.destroy();
}).catch(error => console.log(error));
