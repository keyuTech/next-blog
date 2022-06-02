import { NextApiHandler } from 'next';
import path from 'path'
import { promises } from 'fs';
import getPosts from '../../../lib/posts';

const Posts: NextApiHandler = async (req, res) => {
  const posts = await getPosts()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(posts))
  res.end()
};

export default Posts;
