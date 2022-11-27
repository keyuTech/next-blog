import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { withSessionSsr } from "lib/withSession";
import { UserRes } from "./api/v1/users";
import { useForm } from "hooks/useForm";
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { SnackbarMessage } from "types";

const SignIn: NextPage<{ user: UserRes }> = (props) => {
  const router = useRouter();
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };
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
          setSnackPack((prev) => [
            ...prev,
            { message: "登录成功", key: new Date().getTime() },
          ]);
          setTimeout(() => {
            const query = router.query;
            if (query?.return_to) {
              router.push({
                pathname: query.return_to.toString(),
              });
            } else {
              router.push({
                pathname: "/",
              });
            }
          }, 3000);
        },
      },
    },
  });

  return (
    <div className={"container p-16 mx-auto"}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
      />
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
