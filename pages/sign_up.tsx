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

interface UserErrors {
  username?: string[];
  password?: string[];
  passwordConfirmation?: string[];
}

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [userErrors, setUserErrors] = useState<UserErrors>({});
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      axios.post(`/api/v1/users`, formData).then(
        () => {},
        (error: AxiosError<UserErrors>) => {
          setUserErrors({ ...userErrors, ...error.response?.data });
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
          {!!userErrors.username?.length && <p>{userErrors.username[0]}</p>}
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
          {!!userErrors.password?.length && <p>{userErrors.password[0]}</p>}
        </div>
        <div>
          <label>
            重复密码
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
          </label>
          {!!userErrors.passwordConfirmation?.length && <p>{userErrors.passwordConfirmation[0]}</p>}
        </div>
        <div>
          <button type={"submit"}>注册</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
