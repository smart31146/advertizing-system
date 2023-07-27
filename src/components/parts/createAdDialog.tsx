import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { Configuration, OpenAIApi } from "openai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  titles: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateAdDialog = ({ titles, open, setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("作成された広告文章です．");
  const { data: session } = useSession();

  useEffect(() => {
    setQuestion(titles.join("\n\n"));
  }, [titles]);

  const handleCreate = () => {
    setLoading(true);
    setComplete(false);

    const ads = titles
      .map((title, index) => `広告${index + 1}:「${title}」,`)
      .join("\n\n")
      .slice(0, -1);
    if (!session || !session.user.api_key) {
      toast.error("APIキーが設定されていません");
      setLoading(false);
      return;
    }
    const configuration = new Configuration({
      apiKey: session.user.api_key,
    });
    const openai = new OpenAIApi(configuration);
    const createAdPrompt = `私には以下の広告タイトルがあります:${ads}.これらを参考に,3つの新しい広告タイトルを生成してください.`;

    const promise = new Promise((resolve, reject) => {
      openai
        .createChatCompletion({
          model: session.user.model == "GPT3.5" ? "gpt-3.5-turbo" : "gpt-4",
          messages: [{ role: "user", content: createAdPrompt }],
        })
        .then((response) => {
          console.log(response);
          if (response.data.choices[0].message?.content) {
            setAnswer(response.data.choices[0].message.content);
            setComplete(true);
            resolve(response.data);
          } else {
            setComplete(false);
            reject();
          }
        })
        .catch((error) => {
          console.error("error", error);
          setComplete(false);
          reject();
        })
        .finally(() => {
          setLoading(false);
        });
    });
    toast.promise(promise, {
      loading: `${
        session.user.model == "GPT3.5" ? "gpt-3.5-turbo" : "gpt-4"
      }で広告文章を作成中`,
      success: "作成しました！",
      error: `作成に失敗しました！${
        session.user.model == "GPT4" &&
        "apiキーがgpt-4に対応していない可能性があります"
      }`,
    });
  };

  const handleCopy = () => {
    toast.success("コピーしました");
  };

  return (
    <Dialog open={open} onClose={() => setOpen} fullWidth>
      <DialogTitle>広告を作成</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            multiline
            rows={5}
            fullWidth
            label="これらの広告文章から新しい広告文章を作成します．"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreate}
              >
                広告文章作成
              </Button>
            )}
          </Box>
          {complete && (
            <Stack spacing={2} sx={{ pt: 5 }}>
              <TextField
                multiline
                rows={8}
                fullWidth
                label="作成された広告文章です．"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CopyToClipboard text={answer} onCopy={handleCopy}>
                  <Button variant="contained" color="primary" fullWidth>
                    コピー
                  </Button>
                </CopyToClipboard>
              </Box>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>閉じる</Button>
      </DialogActions>
      <Toaster position="top-right" reverseOrder={false} />
    </Dialog>
  );
};

export default CreateAdDialog;
