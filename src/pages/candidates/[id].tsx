import { HRButton } from "@/components/HRButton";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { Flex, Stack, Tag, TagLabel, useDisclosure } from "@chakra-ui/react";
import { candidate, employee } from "@prisma/client";
import Prisma from "../../../libs/prisma";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HRInput } from "@/components/HRInput";
import { useState } from "react";

export default function Candidate({
  data,
  employees,
}: {
  data: candidate;
  employees: employee[];
}) {
  const employeeOptions = employees.map((e) => ({
    label: `${e.firstName} ${e.lastName}`,
    value: e.employeeId.toString(),
  }));

  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewerOne: "",
    interviewerTwo: "",
    interviewerThree: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDir="column" gap={8}>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Schedule Interview</DrawerHeader>
          <DrawerBody>
            <Stack>
              <HRInput type="date" label="Date" />
              <Typography variant="h3">Interviewer</Typography>
              <HRSelect
                label="Interviewer 1"
                options={employeeOptions}
                placeholder="Select Employee"
                isRequired
              />
              <HRSelect
                label="Interviewer 2"
                options={employeeOptions}
                placeholder="Select Employee"
                isRequired
              />
              <HRSelect
                label="Interviewer 3"
                options={employeeOptions}
                placeholder="Select Employee"
                isRequired
              />
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <HRButton onClick={onClose}>Schedule</HRButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Flex gap={8} flexWrap="wrap" align="center" width="100%">
        <Flex gap={4} flexWrap="wrap" flex="1">
          <Typography variant="h1">
            {data.firstName} {data.lastName}
          </Typography>
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
          <HRButton onClick={onOpen}>Schedule Interview</HRButton>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h3">Contact Info</Typography>
        <Flex gap={20} flexWrap="wrap">
          <Typography flex="1">Email: {data.email}</Typography>
          <Typography flex="2">Tel. Number: {data.telephoneNumber}</Typography>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h3">Salary</Typography>
        <Flex gap={20} flexWrap="wrap">
          <Typography flex="1">Expected: {data.expectedSalary}</Typography>
          <Typography flex="2">
            Previous / Current: {data.previousSalary}
          </Typography>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h2">Resume/CV Round</Typography>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h3">Reviewers</Typography>
        <Flex gap={20} flexWrap="wrap">
          <Flex flexDir="column" gap={2} flex={1}>
            <Typography>Reviewer 1</Typography>
            <HRSelect
              label="Reviwer"
              options={employeeOptions}
              placeholder="Select Reviewer"
              isRequired
            />
          </Flex>
          <Flex flexDir="column" gap={2} flex={2}>
            <Typography>Status</Typography>
            <Typography variant="h2" color="#69C091">
              Passed
            </Typography>
          </Flex>
        </Flex>
        <Flex gap={20} flexWrap="wrap">
          <Flex flexDir="column" gap={2} flex={1}>
            <Typography>Reviewer 2</Typography>
            <HRSelect
              label="Reviwer"
              options={employeeOptions}
              placeholder="Select Reviewer"
              isRequired
            />
          </Flex>
          <Flex flexDir="column" gap={2} flex={2}>
            <Typography>Status</Typography>
            <Typography variant="h2" color="#69C091">
              Passed
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Typography variant="h2">Interview Round</Typography>
      </Flex>
      <Stack>
        <Typography>Date: 29 May 2023</Typography>
        <Typography>Overall Score: 4.4 / 5</Typography>
        <Typography>Interviewer 1: Pichyapa Khanapattanawong</Typography>
        <Typography>Score: 4.2</Typography>
        <Typography>Interviewer 2: Sakolkrit Pengkhum</Typography>
        <Typography>Score: 4.6</Typography>
      </Stack>
    </Flex>
  );
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

  const employees = await Prisma.employee.findMany({});

  return {
    props: {
      data,
      employees: employees.map((e) => ({
        firstName: e.firstName,
        lastName: e.lastName,
        employeeId: e.employeeId,
      })),
    },
  };
}
