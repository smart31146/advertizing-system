import { Button, Container, Stack, TextField } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormInput = {
  name: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInput>();
  const { data: session } = useSession();
  console.log("session", session);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        redirect: false,
        username: data.name,
        password: data.password,
      }).then((res) => {
        if (res?.error) {
          console.log(res.error);
        } else {
          router.push("/");
        }
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Stack spacing={3}>
        <TextField
          required
          label="ユーザーネーム"
          type="text"
          {...register("name")}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          {...register("password")}
        />
        {!loading ? (
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            ログイン
          </Button>
        ) : (
          <Button color="primary" variant="contained" size="large" disabled>
            ログイン中...
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Login;
