import { NextPage } from "next";
import { useForm } from "hooks/useForm";
import axios from "axios";
import Router from "next/router";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const PostsNew: NextPage = (props) => {
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
          Router.push({
            pathname: '/posts',
            query: {page: 1}
          })
        },
      },
    },
  });
  return (
    <div className={'container mx-auto my-16'}>
      {form}
    </div>
  );
};

export default PostsNew;
