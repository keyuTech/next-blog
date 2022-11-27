import { NextPage } from "next";
import axios from "axios";
import { useForm } from "hooks/useForm";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const SignUp: NextPage = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push({
      pathname: "/",
    });
  };
  const { form } = useForm({
    options: {
      initFormData: { username: "", password: "", passwordConfirmation: "" },
      fields: [
        { label: "用户名", type: "text", key: "username" },
        { label: "密码", type: "password", key: "password" },
        { label: "确认密码", type: "password", key: "passwordConfirmation" },
      ],
      buttons: [
        <button key={"signUp"} type={"submit"} className={"button mr-8"}>
          注册
        </button>,
        <span key={"toHome"} onClick={handleBackClick} className={"button"}>
          返回首页
        </span>,
      ],
      submit: {
        request: (formData) => axios.post(`/api/v1/users`, formData),
        success: () => {
          <Alert severity="success">注册成功</Alert>;
          router.push({
            pathname: "/sign_in",
          });
        },
      },
    },
  });

  return (
    <div className={"container p-16 mx-auto"}>
      <h1 className="text-3xl">注册</h1>
      {form}
    </div>
  );
};

export default SignUp;
