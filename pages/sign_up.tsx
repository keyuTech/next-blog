import { NextPage } from "next";
import axios from "axios";
import { useForm } from "hooks/useForm";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { SnackbarMessage } from "types";

const SignUp: NextPage = () => {
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
          setSnackPack((prev) => [
            ...prev,
            { message: "注册成功", key: new Date().getTime() },
          ]);
          setTimeout(() => {
            router.push({
              pathname: "/sign_in",
            });
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
      <h1 className="text-3xl">注册</h1>
      {form}
    </div>
  );
};

export default SignUp;
