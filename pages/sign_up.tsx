import { NextPage } from "next";
import axios from "axios";
import { useForm } from "hooks/useForm";
import { useRouter } from "next/router";

const SignUp: NextPage = () => {
  const router = useRouter()
  const { form } = useForm({
    options: {
      initFormData: { username: "", password: "", passwordConfirmation: "" },
      fields: [
        { label: "用户名", type: "text", key: "username" },
        { label: "密码", type: "password", key: "password" },
        { label: "确认密码", type: "password", key: "passwordConfirmation" },
      ],
      buttons: [<button key={'signUp'} type={"submit"}>注册</button>],
      submit: {
        request: (formData) => axios.post(`/api/v1/users`, formData),
        success: () => {
          window.alert('注册成功')
          router.push({
            pathname: '/sign_in'
          })
        }
      }
    },
  });

  return (
    <>
      <h1 className="text-3xl">注册</h1>
      {form}
    </>
  );
};

export default SignUp;
