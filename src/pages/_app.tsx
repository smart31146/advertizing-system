import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@/configs/mui/theme";
import createEmotionCache from "@/configs/mui/createEmotionCache";
import Layout from "@/components/layout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ja";
import { SessionProvider } from "next-auth/react";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex" />
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
          <SessionProvider session={pageProps.session}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
