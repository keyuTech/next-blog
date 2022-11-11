import { NextApiHandler } from "next";
import prisma from "lib/prisma";
import { genPassword } from "pages/utils/crypto";
import _ from 'lodash'

const Session: NextApiHandler = async (req, res) => {
  const {username, password} = req.body
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  const user = await prisma.user.findUnique({where: {username}})
  console.log('user');
  console.log(user);
  if (user) {
    if(user.password_digest === genPassword(password)) {
      res.statusCode = 200
      res.write(JSON.stringify(_.omit(user, 'password_digest')))
    } else {
      res.statusCode = 422
      res.write(JSON.stringify({password: ['密码不匹配']}))
    }
  } else {
    res.statusCode = 422
    res.write(JSON.stringify({username: ['用户不存在']}))
  }
  res.end()
};

export default Session;
