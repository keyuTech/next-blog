import { NextPage } from "next";
import prisma from "lib/prisma";
import { Form } from "components/form";

const PostsNew: NextPage = (props) => {
  return <div>
    post new
    <Form fields={[{label: 'aa', type: 'text'}]} />
  </div>;
};

export default PostsNew;