import { withSessionApi } from "./../../../../lib/withSession";
import { NextApiHandler } from "next";
import prisma from "lib/prisma";

const PostDelete: NextApiHandler = withSessionApi(async (req, res) => {
  const { id, title, content, author_id } = req.body;
  const queryId = req.query.id?.toString();
  if (req.method === "PATCH") {
    const result = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.statusCode = 200;
    res.write(JSON.stringify(result || null));
    res.end();
  } else if (req.method === "DELETE" && queryId) {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(queryId) },
    });
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    if (req.session.user?.id === post?.author_id) {
      await prisma.post.delete({ where: { id: parseInt(queryId) } });
      res.statusCode = 200;
      res.end();
    } else {
      res.statusCode = 401;
      res.end();
    }
  }
});

export default PostDelete;
