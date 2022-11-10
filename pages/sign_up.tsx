import { NextPage } from "next";
import useSWR from "swr";
import axios, { AxiosError } from "axios";
import { FormEvent, useCallback, useState } from "react";
import { event } from "eventemitter2";

interface UserFormData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface UserError {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
}

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [userError, setUserError] = useState<UserError>({});
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      axios.post(`/api/v1/users`, formData).then(
        () => {},
        (error: AxiosError<UserError>) => {
          setUserError({ ...userError, ...error.response?.data });
        }
      );
    },
    [formData]
  );

  return (
    <>
      <h1>注册</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>用户名</label>
          <input
            className="bg-gray-200"
            type="text"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
        </div>
        <div>
          <label>密码</label>
          <input
            className="bg-gray-200"
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
        <div>
          <label>重复密码</label>
          <input
            className="bg-gray-200"
            type="password"
            value={formData.passwordConfirmation}
            onChange={(e) => {
              setFormData({
                ...formData,
                passwordConfirmation: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <button type={"submit"}>注册</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
