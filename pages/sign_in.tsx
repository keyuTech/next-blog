import { GetServerSideProps, NextPage } from "next";
import axios, { AxiosError } from "axios";
import { FormEvent, useCallback, useState } from "react";
import { withSessionSsr } from "lib/withSession";
import { UserRes } from "./api/v1/users";

interface SignInFormData {
  username: string;
  password: string;
}

interface SignInErrors {
  username?: string[];
  password?: string[];
}

const SignIn: NextPage<{user: UserRes}> = (props) => {
  const [formData, setFormData] = useState<SignInFormData>({
    username: "",
    password: "",
  });
  const [signInErrors, setSignInErrors] = useState<SignInErrors>({});
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      axios.post(`/api/v1/session`, formData).then(
        () => {},
        (error: AxiosError<SignInErrors>) => {
          console.log(error);
          
          setSignInErrors({ ...signInErrors, ...error.response?.data });
        }
      );
    },
    [formData]
  );

  return (
    <>
      <h1 className="text-3xl">登录</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            用户名
            <input
              className="bg-gray-200"
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
          </label>
          {!!signInErrors.username?.length && <p>{signInErrors.username[0]}</p>}
        </div>
        <div>
          <label>
            密码
            <input
              className="bg-gray-200"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </label>
          {!!signInErrors.password?.length && <p>{signInErrors.password[0]}</p>}
        </div>
        <div>
          <button type={"submit"}>登录</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({req}) => {
  return {
    props: {
      user: req.session.user || null
    }
  }
})