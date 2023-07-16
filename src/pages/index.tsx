import Head from "next/head";
import { Alert, Box, Stack } from "@mui/material";
import SearchBox from "@/components/top/searchBox";
import AdList from "@/components/top/adList";
import { useState } from "react";
import { OutlineAd } from "@/types/ads";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/auth/loading";

const Top = () => {
  const [outlines, setOutlines] = useState<OutlineAd[]>([]);
  const [pageCount, setPageCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>広告収集アプリ</title>
        <meta
          name="description"
          content="広告を収集して新しく広告を作成できます．"
        />
      </Head>
      <Box component="main">
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Alert severity="info">ここに重要なお知らせが入ります</Alert>
          <SearchBox
            outlines={outlines}
            setOutlines={setOutlines}
            page={page}
            setPage={setPage}
            setPageCount={setPageCount}
            setLoading={setLoading}
          />
          <AdList
            outlines={outlines}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            loading={loading}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Top;
