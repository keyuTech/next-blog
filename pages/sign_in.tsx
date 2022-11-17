import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { withSessionSsr } from "lib/withSession";
import { UserRes } from "./api/v1/users";
import { useForm } from "hooks/useForm";

const SignIn: NextPage<{ user: UserRes }> = (props) => {
  const { form } = useForm({
    options: {
      initFormData: { username: "", password: "" },
      fields: [
        { label: "用户名", type: "text", key: "username" },
        { label: "密码", type: "password", key: "password" },
      ],
      buttons: [<button key='signIn' type={"submit"}>登录</button>],
      submit: {
        request: (formData) => axios.post(`/api/v1/session`, formData),
        message: '登录成功'
      }
    },
  });

  return (
    <>
      <h1 className="text-3xl">登录</h1>
      {form}
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ req }) => {
    return {
      props: {
        user: req.session.user || null,
      },
    };
  }
);
