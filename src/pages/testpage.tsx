import { Heading } from "@chakra-ui/react";
import { test_table } from "@prisma/client";
import { GetServerSideProps } from "next";
import Prisma from "../../libs/prisma";

type testPageProps = {
  data: test_table[];
};

const TestPage = (props: testPageProps) => {
  const data = props.data;
  return (
    <>
      {data.map((d) => (
        <Heading key={d.test_id}>{d.attr1}</Heading>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await Prisma.test_table.findMany({});
  return {
    props: { data },
  };
};

export default TestPage;
