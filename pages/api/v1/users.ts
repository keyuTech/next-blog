import { NextApiHandler } from 'next';
import prisma from 'lib/prisma';

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create new user
 *     description: Returns the new user
 *     requestBody:
 *        content:
 *          application/json:
 *        parameters:
 *          - in: path
 *     responses:
 *       200:
 *         description: hello world
 */

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body;
  console.log(username);
  console.log(password);
  console.log(passwordConfirmation);
  if (username?.trim()?.length < 3) {
    const error = {username: '用户名太短'};
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
  }
  if (password !== passwordConfirmation) {
    const error = {passwordConfirmation: '密码不匹配'};
    res.statusCode = 422;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
  }
  const result = await CreateUser({
    username: 'user3',
    password_digest: '111'
  })
  console.log('result');
  console.log(result);
  res.end();
};

export default Users;

const CreateUser = async (user: {username: string, password_digest: string}) => {
  return await prisma.user.create({
    data: user
  })
}
