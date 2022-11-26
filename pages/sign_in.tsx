import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { withSessionSsr } from "lib/withSession";
import { UserRes } from "./api/v1/users";
import { useForm } from "hooks/useForm";
import { useRouter } from "next/router";
import Link from "next/link";

const SignIn: NextPage<{ user: UserRes }> = (props) => {
  const router = useRouter();
  const { form } = useForm({
    options: {
      initFormData: { username: "", password: "" },
      fields: [
        { label: "用户名", type: "text", key: "username" },
        { label: "密码", type: "password", key: "password" },
      ],
      buttons: [
        <button key="signIn" type={"submit"} className={"button mr-8"}>
          登录
        </button>,
        <Link key="signUp" href={"/sign_up"}>
          <a className={"button"}>注册</a>
        </Link>,
      ],
      submit: {
        request: (formData) => axios.post(`/api/v1/session`, formData),
        success: () => {
          window.alert("登录成功");
          const query = router.query;
          if (query?.return_to) {
            router.push({
              pathname: query.return_to.toString(),
            });
          } else {
            router.push({
              pathname: '/'
            })
          }
        },
      },
    },
  });

  return (
    <div className={"container p-16 mx-auto"}>
      <h1 className="text-3xl">登录</h1>
      {form}
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ req }) => {
    return {
      props: {
        user: JSON.parse(JSON.stringify(req.session.user || null)),
      },
    };
  }
);
