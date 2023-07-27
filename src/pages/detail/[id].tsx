import { DetailAd } from "@/types/ads";
import { Box } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import { DetailAdResponse } from "../api/ad/get_detail";
import Detail from "@/components/detail";

type DetailPageProps = { detail: DetailAd };

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DetailPageProps>> => {
  const { id } = context.query;
  const { DOMAIN } = process.env;
  if (typeof id !== "string") return { notFound: true };
  const adsid = Number(id);
  const res = await axios.get<DetailAdResponse>(`${DOMAIN}/api/ad/get_detail`, {
    params: { id: adsid },
  });
  const data = res.data;
  if (data == null) return { notFound: true };
  if ("error" in data) return { notFound: true };
  return { props: { detail: data.ad } };
};

const StudentsPage = ({ detail }: DetailPageProps) => {
  console.log("detail", detail);
  return (
    <>
      <Head>
        <title>{detail.title}</title>
        <meta name="description" content={detail.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box component="main" sx={{ mt: 4 }}>
        <Detail ad={detail} />
      </Box>
    </>
  );
};

export default StudentsPage;
