import { NextApiHandler } from "next";
import prisma from "lib/prisma";
import { genPassword } from "pages/utils/crypto";
import _ from 'lodash'

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

interface UserErrors {
  username: string[];
  password: string[];
  passwordConfirmation: string[];
}

const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  const userErrors: UserErrors = {
    username: [],
    password: [],
    passwordConfirmation: [],
  };
  // TODO: 优化校验流程
  if (username?.trim()?.length < 3) {
    userErrors.username.push("用户名太短");
  }
  if (username?.trim()?.length > 14) {
    userErrors.username.push("用户名太长");
  }
  const existedUser = await prisma.user.findUnique({ where: { username } });
  if (existedUser) {
    userErrors.username.push("用户名已存在");
  }
  if (password === "") {
    userErrors.password.push("密码不能为空");
  }
  if (password !== passwordConfirmation) {
    userErrors.passwordConfirmation.push("密码不匹配");
  }
  const hasError = Object.values(userErrors).find((v) => v.length > 0);
  
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  if (hasError) {
    res.statusCode = 400;
    res.write(JSON.stringify(userErrors));
  } else {
    const result = await CreateUser({
      username,
      password_digest: genPassword(password),
    });
    console.log("result");
    console.log(result);
    res.statusCode = 200;
    res.write(JSON.stringify(_.omit(result, ['password_digest'])));
  }
  res.end();
};

export default Users;

const CreateUser = async (user: {
  username: string;
  password_digest: string;
}) => {
  return await prisma.user.create({
    data: user,
  });
};