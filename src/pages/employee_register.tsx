import { HRButton } from "@/components/HRButton";
import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";
import { candidate, department, position } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Prisma from "../../libs/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
  );
  const data = await Prisma.position.findMany({});
  const departments = await Prisma.department.findMany({});
  const candidates = await Prisma.candidate.findMany({});

  return {
    props: {
      positions: data,
      provinces: await res.json(),
      departments,
      candidates,
    },
  };
};

const EmployeeRegisterForm = ({
  provinces,
  positions,
  departments,
  candidates,
}: {
  provinces: any;
  positions: position[];
  departments: department[];
  candidates: candidate[];
}) => {
  const candidateOptions = candidates.map((candidate) => {
    return {
      label: `${candidate.firstName} ${candidate.lastName}`,
      value: candidate.candidateId,
    };
  });

  const provinceOptions = provinces.map((province) => {
    return {
      label: province.name_en,
      value: province.name_en,
    };
  });

  const positionOptions = positions.map((position) => {
    return {
      label: position.positionName,
      value: position.positionId.toString(),
    };
  });

  const departmentOptions = departments.map((department) => {
    return {
      label: department.departmentName,
      value: department.departmentId.toString(),
    };
  });

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    candidateId: "",
    email: "",
    telephoneNumber: "",
    houseNumber: "",
    street: "",
    province: "",
    zipCode: "",
    position: "",
    department: "",
    startDate: "",
    salary: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    candidateId: false,
    email: false,
    telephoneNumber: false,
    houseNumber: false,
    street: false,
    province: false,
    zipCode: false,
    position: false,
    department: false,
    startDate: false,
    salary: false,
  });

  const router = useRouter();

  async function handleSubmit() {
    fetch("api/addEmployee", {
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        salary: data.salary,
        startDate: data.startDate,
        position: data.position,
        candidateId: data.candidateId,
        telephoneNumber: data.telephoneNumber,
        email: data.email,
        departmentId: data.department,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(() => {
      router.push("/");
    });
  }
  return (
    <Flex flexDir="column" gap={8}>
      <Typography variant="h1">Employee Registration</Typography>
      <Flex w="100%" flexDir="column">
        <Typography variant="h2">General Information</Typography>
        <Flex w="100%" gap={4}>
          <HRInput
            label="First Name"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, firstName: true };
              })
            }
            isInvalid={data.firstName == "" && touched.firstName}
            errorMessage="Please enter the first name"
          />
          <HRInput
            label="Last Name"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, lastName: true };
              })
            }
            isInvalid={data.lastName == "" && touched.lastName}
            errorMessage="Please enter the last name"
          />
          <HRSelect
            label="Candidate"
            options={candidateOptions}
            placeholder="Select Candidate"
            onChange={(e) =>
              setData((prev) => ({ ...prev, candidateId: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, candidateId: true };
              })
            }
            isInvalid={data.candidateId == "" && touched.candidateId}
            errorMessage="Please select the candidate"
          />
        </Flex>
      </Flex>
      <Flex w="100%" flexDir="column">
        <Typography variant="h2">Contact Information</Typography>
        <Flex w="100%" gap={4}>
          <HRInput
            label="Email"
            isRequired
            type="email"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, email: true };
              })
            }
            isInvalid={data.email == "" && touched.email}
            errorMessage="Please enter the email"
          />
          <HRInput
            label="Telephone Number"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, telephoneNumber: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, telephoneNumber: true };
              })
            }
            isInvalid={data.telephoneNumber == "" && touched.telephoneNumber}
            errorMessage="Please enter the telephone number"
          />
        </Flex>
        <Flex w="100%" gap={4}>
          <HRInput
            label="House Number"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, houseNumber: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, houseNumber: true };
              })
            }
            isInvalid={data.houseNumber == "" && touched.houseNumber}
            errorMessage="Please enter the house number"
          />
          <HRInput
            label="Street"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, street: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, street: true };
              })
            }
            isInvalid={data.street == "" && touched.street}
            errorMessage="Please enter the street"
          />
          <HRSelect
            label="Province"
            options={provinceOptions}
            placeholder="Select Province"
            onChange={(e) =>
              setData((prev) => ({ ...prev, province: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, province: true };
              })
            }
            isInvalid={data.province == "" && touched.province}
            errorMessage="Please enter the province"
          />
          <HRInput
            label="Zip Code"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, zipCode: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, zipCode: true };
              })
            }
            isInvalid={data.zipCode == "" && touched.zipCode}
            errorMessage="Please enter the zip code"
          />
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
            onChange={(e) =>
              setData((prev) => ({ ...prev, position: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, position: true };
              })
            }
            isInvalid={data.position == "" && touched.position}
            errorMessage="Please choose the position"
          />
          <HRSelect
            label="Department"
            options={departmentOptions}
            placeholder="Select Department"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, department: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, department: true };
              })
            }
            isInvalid={data.department == "" && touched.department}
            errorMessage="Please choose the department"
          />
        </Flex>
        <Flex w="100%" gap={4}>
          <HRInput
            type="date"
            label="Start Date"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, startDate: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, startDate: true };
              })
            }
            isInvalid={data.startDate == "" && touched.startDate}
            errorMessage="Please choose the department"
          />
          <HRInput
            type="number"
            label="Salary"
            isRequired
            onChange={(e) =>
              setData((prev) => ({ ...prev, salary: e.target.value }))
            }
            onFocus={() =>
              setTouched((prev) => {
                return { ...prev, salary: true };
              })
            }
            isInvalid={data.salary == "" && touched.salary}
            errorMessage="Please enter the salary"
          />
        </Flex>
      </Flex>
      <Flex gap={4} w="100%" justify="flex-end">
        <HRButton variant="outline" onClick={() => router.push("/")}>
          Cancel
        </HRButton>
        <HRButton onClick={handleSubmit} type="submit">
          Submit
        </HRButton>
      </Flex>
    </Flex>
  );
};

export default EmployeeRegisterForm;
