import { HRButton } from "@/components/HRButton";
import { HRInput } from "@/components/HRInput";
import { HRNumberCard } from "@/components/HRNumberCard";
import { HRSelect } from "@/components/HRSelect";
import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { EmailIcon } from "@chakra-ui/icons";
import { Flex, Tag, TagLabel } from "@chakra-ui/react";

const Company = () => {
  return (
    <Flex flexDir="column" gap={8}>
      <Flex gap={8} flexWrap="wrap" align="center" width="100%">
        <Flex gap={4} flexWrap="wrap" flex="1">
          <Typography variant="h1">Candidate Name</Typography>
          <Tag
            size={"md"}
            key={"md"}
            variant="outline"
            borderColor="#979797"
            backgroundColor="#EDEDED"
          >
            <TagLabel>Pending</TagLabel>
          </Tag>
        </Flex>
        <Flex gap={4} flexWrap="wrap" justify="flex-end" flex="2">
          <HRButton>Schedule Interview</HRButton>
          <HRButton>Resume/CV</HRButton>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h3">Contact Info</Typography>
        <Flex gap={20} flexWrap="wrap">
          <Typography flex="1">Email</Typography>
          <Typography flex="2">Tel. Number</Typography>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h3">Salary</Typography>
        <Flex gap={20} flexWrap="wrap">
          <Typography flex="1">Expected:</Typography>
          <Typography flex="2">Previous / Current:</Typography>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h2">Resume Review</Typography>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h3">Reviewers</Typography>
        <Flex flexDir="column" gap={4}>
          <Typography>Reviewer 1</Typography>
        </Flex>
        <Flex flexDir="column" gap={4}>
          <Typography>Reviewer 2</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Company;
