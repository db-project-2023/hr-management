import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { boxShadow } from "@/styles/boxShadow";
import { Flex, VStack } from "@chakra-ui/react";
import { candidate, position } from "@prisma/client";
import { useRouter } from "next/router";
import Prisma from "../../libs/prisma";

const Candidates = ({
  data,
  position,
}: {
  data: candidate[];
  position: position[];
}) => {
  console.log(data);
  const router = useRouter();
  return (
    <Flex flexDir="column" align="start">
      <Typography variant="h1">All Candidates</Typography>
      <VStack w="100%" gap={4} mt={6}>
        {data.map((data) => (
          <Flex
            key={data.candidateId}
            onClick={() => router.push(`/candidates/${data.candidateId}`)}
            w="100%"
            background="background.primary"
            borderRadius={3}
            p={4}
            boxShadow={boxShadow}
            justify="space-between"
            cursor="pointer"
          >
            <Typography>
              {data.firstName} {data.lastName}
            </Typography>
            <Typography>{data.candidateStatus}</Typography>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export async function getStaticProps({ params }) {
  const data = await Prisma.candidate.findMany();
  const position = await Prisma.position.findMany();

  return { props: { data, position } };
}

export default Candidates;
