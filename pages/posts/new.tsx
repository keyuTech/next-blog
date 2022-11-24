import { NextPage } from "next";
import { useForm } from "hooks/useForm";
import axios from "axios";
import { useRouter } from "next/router";
import "easymde/dist/easymde.min.css";
import Link from "next/link";

const PostsNew: NextPage = (props) => {
  const router = useRouter()
  const { form } = useForm({
    options: {
      initFormData: { title: "", content: "" },
      fields: [
        { label: "标题", type: "text", key: "title" },
        { label: "内容", type: "textarea", key: "content" },
      ],
      buttons: [
        <button className={'border border-stone-900 py-2 px-3'} key={"submit"} type="submit">
          提交
        </button>,
      ],
      submit: {
        request: (formData) => axios.post(`/api/v1/posts`, formData),
        success: () => {
          window.alert("提交成功");
          router.push({
            pathname: '/posts',
            query: {page: 1}
          })
        },
      },
    },
  });
  return (
    <div className={'container mx-auto p-16'}>
      <div className={'flex justify-between'}>
        <Link href={'/posts'}>
          <span className={'link-button hover:text-blue-500'}>返回列表</span>
        </Link>
      </div>
      {form}
    </div>
  );
};

export default PostsNew;
