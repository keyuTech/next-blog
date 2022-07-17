import { NextApiHandler } from 'next';
import prisma from 'lib/prisma';

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

const Posts: NextApiHandler = async (req, res) => {
  const {username, password} = req.body;
  console.log(username);
  console.log(password);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(''));
  res.end();
};

export default Posts;
