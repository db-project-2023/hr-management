import { HRInput } from "@/components/HRInput";
import { HRNumberCard } from "@/components/HRNumberCard";
import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";

const Company = () => {
  return (
    <Flex flexDir="column" gap={8}>
      <Flex flexDir="column" gap={8}>
        <Typography variant="h1">We are looking for...</Typography>
        <Flex gap={4} flexWrap="wrap">
          <HRNumberCard
            number={2}
            title="Project Manager"
            description="10 Candidates"
          />
          <HRNumberCard
            number={10}
            title="Senior Frontend Engineer"
            description="15 Candidate"
          />
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Flex w="100%" align="center" justify="space-between">
          <Typography variant="h1">Employee Members</Typography>
          <Flex w="40%">
            <HRInput placeholder="Search from Department" />
          </Flex>
        </Flex>
        <HRTable
          headers={["", "Employed", "Require", "Candidate", "Status "]}
          rows={[
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Marketing</Typography>
                <Typography variant="description">Business</Typography>
              </Flex>,
              <Typography key="employed" fontSize="2xl">
                20
              </Typography>,
              <Typography key="employed" fontSize="2xl">
                -
              </Typography>,
              <Typography key="employed" fontSize="2xl">
                -
              </Typography>,
              <Typography key="employed" fontSize="2xl">
                -
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Marketing</Typography>
                <Typography variant="description">Business</Typography>
              </Flex>,
              <Typography key="employed" fontSize="2xl">
                20
              </Typography>,
              <Typography key="employed" fontSize="2xl">
                -
              </Typography>,
              <Typography key="employed" fontSize="2xl">
                -
              </Typography>,
              <Typography key="employed" fontSize="2xl">
                -
              </Typography>,
            ],
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default Company;
