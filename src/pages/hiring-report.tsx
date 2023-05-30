import { HRInput } from "@/components/HRInput";
import { HRNumberCard } from "@/components/HRNumberCard";
import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";
import { HStack, Heading, Stack } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { candidate, position } from "@prisma/client";
import Prisma from "../../libs/prisma";

function groupBy(xs, f) {
  return xs.reduce(
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
}

export const getStaticProps = async () => {
  const data = await Prisma.position.findMany({});
  const candidates = await Prisma.candidate.findMany({});
  return {
    props: {
      positions: data,
      candidates,
    },
  };
};
const EmployeeRegisterForm = ({
  positions,
  candidates,
}: {
  positions: position[];
  candidates: candidate[];
}) => {
  const candidateByPosition = groupBy(candidates, (l) => l.positionId);
  console.log(candidateByPosition);
  return (
    <>
      <Heading>Hiring Report</Heading>
      <Heading as="h4" size="md">
        Candidate Department Summary
      </Heading>
      <Flex flexDir="column" gap={8}>
        <Flex flexDir="column">
          <Flex w="100%" align="center" justify="space-between"></Flex>
          <HRTable
            headers={["", "Register"]}
            rows={positions.map((position) => [
              <Typography variant="h3" key={position.positionId}>
                {position.positionName}
              </Typography>,
              <Typography key={position.positionId}>
                {candidateByPosition[position.positionId]?.length ?? 0}
              </Typography>,
            ])}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default EmployeeRegisterForm;
