import Head from "next/head";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/auth/loading";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

type ChatGPTModels = "GPT3.5" | "GPT4";

const Chatgpt = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  const [openAiKey, setOpenAiKey] = useState<string>("");
  const [model, setModel] = useState<ChatGPTModels>("GPT3.5");

  const handleButtonClick = () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/api/user/set_chatgpt", {
          id: "user name",
          openAiKey,
          model,
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
    toast.promise(promise, {
      loading: "保存中",
      success: "保存しました",
      error: "保存に失敗しました",
    });
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>広告収集アプリ|アカウント</title>
        <meta
          name="description"
          content="広告を収集して新しく広告を作成できます．"
        />
      </Head>
      <Box component="main">
        <Toaster position="top-right" reverseOrder={false} />
        <Grid container spacing={2} sx={{ mt: 10 }}>
          <Grid item xs={7}>
            <TextField
              fullWidth
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              label="OpenAI API Key"
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              value={model}
              onChange={(e) => setModel(e.target.value as ChatGPTModels)}
              label="モデル"
              size="small"
            >
              <MenuItem value="GPT3.5">GPT3.5</MenuItem>
              <MenuItem value="GPT4">GPT4</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Chatgpt;
