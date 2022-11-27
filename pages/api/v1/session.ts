import { NextApiHandler } from "next";
import prisma from "lib/prisma";
import genPassword from "pages/utils/crypto";
import _ from 'lodash'
import { withSessionApi } from "lib/withSession";

// TODO: 校验
const Session: NextApiHandler = async (req, res) => {
  const {username, password} = req.body
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  const user = await prisma.user.findUnique({where: {username}})
  
  if (user) {
    if(user.password_digest === genPassword(password)) {
      const result = _.omit(user, 'password_digest')
      req.session.user = result
      await req.session.save()
      res.statusCode = 200
      res.write(JSON.stringify(result || null))
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

export default withSessionApi(Session);
