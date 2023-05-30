import { HRButton } from "@/components/HRButton";
import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { Heading, Stack, FormLabel, FormControl, Flex } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { employee } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Prisma from "../../libs/prisma";

export const getStaticProps = async () => {
  const employees = await Prisma.employee.findMany({});
  return {
    props: {
      employees: employees.map((e) => ({
        employeeId: e.employeeId,
        firstName: e.firstName,
        lastName: e.lastName,
      })),
    },
  };
};
const LeaveRequest = ({ employees }: { employees: employee[] }) => {
  const router = useRouter();
  const [data, setData] = useState({
    leaveType: "sick",
    startDate: "",
    endDate: "",
    attachement: {},
    employeeId: "",
  });

  const employeesOptions = employees.map((e) => ({
    label: `${e.firstName} ${e.lastName}`,
    value: e.employeeId,
  }));

  const isValid = data.startDate && data.endDate;

  async function handleSubmit() {
    fetch("api/requestLeave", {
      body: JSON.stringify({
        leaveType: data.leaveType,
        startDate: data.startDate,
        endDate: data.endDate,
        employeeId: data.employeeId,
        attachment: data.attachement,
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
    <Stack gap={4}>
      <Heading mb={4}>Leave Request</Heading>
      <FormControl isRequired>
        <FormLabel requiredIndicator={""}>
          <Flex gap={1}>
            <Typography color="content.error">*</Typography>
            <Typography>Leave Type</Typography>
          </Flex>
          <RadioGroup
            mt={2}
            gap={8}
            display="flex"
            defaultValue="sick"
            onChange={(e) => {
              setData((prev) => ({ ...prev, leaveType: e }));
            }}
          >
            <Radio colorScheme="orange" value="sick">
              Sick Leave
            </Radio>
            <Radio colorScheme="orange" value="vacation">
              Vacation Leave
            </Radio>
            <Radio colorScheme="orange" value="personal">
              Personal Leave
            </Radio>
            <Radio colorScheme="orange" value="maternity">
              Maternity Leave
            </Radio>
          </RadioGroup>
        </FormLabel>
      </FormControl>
      <HRSelect
        label="Employee"
        options={employeesOptions}
        placeholder="Select Employee"
        onChange={(e) =>
          setData((prev) => ({ ...prev, employeeId: e.target.value }))
        }
      />
      <HRInput
        label="Start Date"
        type="date"
        isRequired
        onChange={(e) => {
          setData((prev) => ({ ...prev, startDate: e.target.value }));
        }}
      />
      <HRInput
        label="End Date"
        type="date"
        isRequired
        onChange={(e) => {
          setData((prev) => ({ ...prev, endDate: e.target.value }));
        }}
      />
      <HRInput
        label="Attachments"
        type="file"
        placeholder="File"
        onChange={(e) => {
          setData((prev) => ({ ...prev, attachement: e.target.files }));
        }}
      />
      <Flex justify="flex-end" w="100%">
        <HRButton type="submit" isDisabled={!isValid} onClick={handleSubmit}>
          Submit
        </HRButton>
      </Flex>
      {/*<Heading as="h4" size="md" mb={4} mt={12}>
        For Manager
      </Heading>
      <RadioGroup defaultValue="1">
        <Stack spacing={5} direction="row">
          <Radio colorScheme="orange" value="1">
            Approve
          </Radio>
          <Radio colorScheme="orange" value="2">
            Deny
          </Radio>
        </Stack>
      </RadioGroup>
  <HRInput label="Reasons/Comments" placeholder="Placeholder Text" />*/}
    </Stack>
  );
};

export default LeaveRequest;
