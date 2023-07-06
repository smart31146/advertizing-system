import { DetailAds } from "@/types/ads";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";

type DetailPageProps = { detail: DetailAds };

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DetailPageProps>> => {
  const { id } = context.query;
  const { DOMEIN } = process.env;
  if (typeof id !== "string") return { notFound: true };
  const adsid = Number(id);
  const res = await axios.get(`http://${DOMEIN}/api/detail`, {
    params: { id: adsid },
  });
  const data = res.data as { ads: DetailAds } | { error: string } | null;
  if (data == null) return { notFound: true };
  if ("error" in data) return { notFound: true };
  return { props: { detail: data.ads } };
};

const StudentsPage = ({ detail }: DetailPageProps) => {
  console.log("detail", detail);
  return (
    <>
      <Head>
        <title>{detail.title}</title>
        <meta name="description" content={detail.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Typography>{detail.title}</Typography>
      </Container>
    </>
  );
};

export default StudentsPage;
