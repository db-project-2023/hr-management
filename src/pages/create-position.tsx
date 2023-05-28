import { HRButton } from "@/components/HRButton";
import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { CloseIcon } from "@chakra-ui/icons";
import {
  HStack,
  Heading,
  Stack,
  FormLabel,
  FormControl,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { department, skill } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Prisma from "../../libs/prisma";

export const getServerSideProps = async () => {
  const data = await Prisma.department.findMany({});
  const skills = await Prisma.skill.findMany({});
  return {
    props: {
      departments: data,
      skillsData: skills,
    },
  };
};

const CreatePosition = ({
  departments,
  skillsData,
}: {
  departments: department[];
  skillsData: skill[];
}) => {
  const router = useRouter();
  console.log(departments);
  const [active, setActive] = useState("");
  const [skills, setSkills] = useState([]);
  const [data, setData] = useState({
    positionName: "",
    department: 0,
    isHiring: true,
    required: 0,
    maxSalary: "",
    minSalary: "",
    jobDescription: "",
  });

  const [touched, setTouched] = useState({
    positionName: false,
    department: false,
    required: false,
    maxSalary: false,
    minSalary: false,
    jobDescription: false,
  });

  const isValid =
    data.positionName &&
    data.required &&
    data.maxSalary &&
    data.minSalary &&
    data.jobDescription &&
    skills.length != 0;

  async function handleSubmit() {
    fetch("api/addPosition", {
      body: JSON.stringify({
        positionName: data.positionName,
        required: data.required,
        maxSalary: data.maxSalary,
        minSalary: data.minSalary,
        jobDescription: data.jobDescription,
        isHiring: data.isHiring,
        departmentId: data.department,
        criteria: skills,
        department: data.department,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(() => {
      //router.push("/");
    });
  }

  const departmentOptions = departments.map((department) => ({
    label: department.departmentName,
    value: department.departmentId.toString(),
  }));

  const skillsOptions = skillsData.map((skill) => ({
    label: skill.skillName,
    value: skill.skillName,
  }));

  return (
    <>
      <HStack w="100vw" gap={4}>
        <Heading>Job Position</Heading>
        <FormControl display="flex" flex={1} alignItems="center">
          <FormLabel>Is Hiring?</FormLabel>
          <Switch
            size="md"
            onChange={(e) =>
              setData((prev) => ({ ...prev, isHiring: e.target.checked }))
            }
            defaultChecked
          />
        </FormControl>
      </HStack>
      <Heading as="h4" size="md" mt={8}>
        Job Information
      </Heading>
      <HRInput
        label="Position name"
        isRequired
        onChange={(e) =>
          setData((prev) => ({ ...prev, positionName: e.target.value }))
        }
        onFocus={() =>
          setTouched((prev) => {
            return { ...prev, positionName: true };
          })
        }
        isInvalid={data.positionName == "" && touched.positionName}
        errorMessage="Please enter the position name"
      />
      <HRSelect
        label="Department"
        options={departmentOptions}
        placeholder="Choose Department"
        isRequired
        onChange={(e) =>
          setData((prev) => ({ ...prev, department: parseInt(e.target.value) }))
        }
        onFocus={() =>
          setTouched((prev) => {
            return { ...prev, department: true };
          })
        }
        isInvalid={!data.department && touched.department}
        errorMessage="Please choose the department"
      />
      <HRInput
        label="Employee number needed"
        isRequired
        type="number"
        onChange={(e) =>
          setData((prev) => ({ ...prev, required: parseInt(e.target.value) }))
        }
        onFocus={() =>
          setTouched((prev) => {
            return { ...prev, required: true };
          })
        }
        isInvalid={!data.required && touched.required}
        errorMessage="Please enter the required number of employees"
      />
      <HRInput
        label="Maximum salary"
        isRequired
        type="number"
        onChange={(e) =>
          setData((prev) => ({ ...prev, maxSalary: e.target.value }))
        }
        onFocus={() =>
          setTouched((prev) => {
            return { ...prev, maxSalary: true };
          })
        }
        isInvalid={!data.maxSalary && touched.maxSalary}
        errorMessage="Please enter the max salary"
      />
      <HRInput
        label="Minimum salary"
        isRequired
        type="number"
        onChange={(e) =>
          setData((prev) => ({ ...prev, minSalary: e.target.value }))
        }
        onFocus={() =>
          setTouched((prev) => {
            return { ...prev, minSalary: true };
          })
        }
        isInvalid={!data.minSalary && touched.minSalary}
        errorMessage="Please enter the max salary"
      />
      <HRInput
        label="Job Description"
        isRequired
        onChange={(e) =>
          setData((prev) => ({ ...prev, jobDescription: e.target.value }))
        }
        onFocus={() =>
          setTouched((prev) => {
            return { ...prev, jobDescription: true };
          })
        }
        isInvalid={data.jobDescription == "" && touched.jobDescription}
        errorMessage="Please enter the job description"
      />
      <HStack align="center" justify="space-between">
        <HRSelect
          label="Criteria"
          w="50%"
          isRequired
          placeholder="Choose skills for criteria"
          options={skillsOptions}
          onChange={(e) => setActive(e.target.value)}
        />
        <HRButton
          onClick={() =>
            setSkills((prev) =>
              [...new Set([...prev, active])].filter((val) => val != "")
            )
          }
        >
          Add Criteria
        </HRButton>
      </HStack>
      <VStack align="flex-start">
        {skills.map((skill) => (
          <HStack key={skill}>
            <Typography>{skill}</Typography>
          </HStack>
        ))}
      </VStack>
      {/*<Heading as="h4" size="md">
        Criteria
      </Heading>
      <Stack spacing={3}>
        <Text fontSize="md">* Technical Skills</Text>
        <Text fontSize="md">* Exper</Text>
        <Text fontSize="md">* Veral Communication</Text>
        <Text fontSize="md">* Enthusiaam</Text>
        <Text fontSize="md">* Teamwork</Text>
        <Text fontSize="md">* Knowledge about the company</Text>
        <Button colorScheme="orange">+ Add Criteria</Button>
    </Stack>*/}
      <Flex w="100%" justify="flex-end">
        <HRButton isDisabled={!isValid} onClick={handleSubmit}>
          Submit
        </HRButton>
      </Flex>
    </>
  );
};

export default CreatePosition;
