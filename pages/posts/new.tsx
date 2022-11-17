import { NextPage } from "next";
import { useForm } from "hooks/useForm";
import axios from "axios";

const PostsNew: NextPage = (props) => {
  const { form } = useForm({
    options: {
      initFormData: { title: "", content: "" },
      fields: [
        { label: "标题", type: "text", key: "title" },
        { label: "内容", type: "textarea", key: "content" },
      ],
      buttons: [<button key={'submit'} type="submit">提交</button>],
      submit: {
        request: (formData) => axios.post(`/api/v1/posts`, formData),
        success: () => window.alert("提交成功"),
      },
    },
  });
  return (
    <div>
      post new
      {form}
    </div>
  );
};

export default PostsNew;
