import { withSessionApi } from "lib/withSession";
import { NextApiHandler } from "next";
import prisma from "lib/prisma";

const Posts: NextApiHandler = withSessionApi(async (req, res) => {
  const { title, content } = req.body;
  const user = req.session?.user;

  res.setHeader("Content-Type", "application/json;charset=utf-8");
  if (user) {
    const result = await prisma.post.create({
      data: { title, content, author_id: user.id },
    });
    res.statusCode = 200;
    res.write(JSON.stringify(result || null));
  } else {
    res.statusCode = 401;
  }
  res.end();
});

export default Posts;