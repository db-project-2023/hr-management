import { Typography } from "@/components/Typography";
import Prisma from "../../../libs/prisma";

export default function Candidate({ data }) {
  return <Typography>{data.candidateId}</Typography>;
}

export async function getStaticPaths() {
  const ids = await Prisma.candidate.findMany({
    select: { candidateId: true },
  });
  return {
    paths: ids.map((id) => ({
      params: {
        id: id.candidateId.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await Prisma.candidate.findUnique({
    where: {
      candidateId: parseInt(params.id),
    },
  });

  return { props: { data } };
}
