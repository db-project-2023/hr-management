import { HRButton } from "@/components/HRButton";
import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Prisma from "../../libs/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
  );
  const data = await Prisma.position.findMany({});
  return {
    props: { positions: data, provinces: await res.json() },
  };
};

const EmployeeRegisterForm = ({ provinces, positions }) => {
  const provinceOptions = provinces.map((province) => {
    return {
      label: province.name_en,
      value: province.name_en,
    };
  });

  const positionOptions = positions.map((position) => {
    return {
      label: position.positionId,
      value: position.positionId,
    };
  });
  return (
    <Flex flexDir="column" gap={8}>
      <Typography variant="h1">Employee Registration</Typography>
      <Flex w="100%" flexDir="column">
        <Typography variant="h2">General Information</Typography>
        <Flex w="100%" gap={4}>
          <HRInput label="First Name" isRequired />
          <HRInput label="Last Name" isRequired />
        </Flex>
      </Flex>
      <Flex w="100%" flexDir="column">
        <Typography variant="h2">Contact Information</Typography>
        <Flex w="100%" gap={4}>
          <HRInput label="Email" isRequired type="email" />
          <HRInput label="Telephone Number" isRequired />
        </Flex>
        <Flex w="100%" gap={4}>
          <HRInput label="House Number" isRequired />
          <HRInput label="Street" isRequired />
          <HRSelect
            label="Province"
            options={provinceOptions}
            placeholder="Select Province"
          />
          <HRInput label="Zip Code" isRequired />
        </Flex>
      </Flex>
      <Flex w="100%" flexDir="column">
        <Typography variant="h2">Contract Information</Typography>
        <Flex w="100%" gap={4}>
          <HRSelect
            label="Position"
            options={positionOptions}
            placeholder="Select Position"
            isRequired
          />
          <HRSelect
            label="Department"
            options={positionOptions}
            placeholder="Select Department"
            isRequired
          />
        </Flex>
        <Flex w="100%" gap={4}>
          <HRInput type="date" label="Start Date" isRequired />
          <HRInput type="number" label="Salary" isRequired />
        </Flex>
      </Flex>
      <Flex gap={4} w="100%" justify="flex-end">
        <HRButton variant="outline">Cancel</HRButton>
        <HRButton>Submit</HRButton>
      </Flex>
    </Flex>
  );
};

export default EmployeeRegisterForm;
