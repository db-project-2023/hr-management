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
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";

const CreatePosition = () => {
  const [active, setActive] = useState("");
  const [skills, setSkills] = useState([]);
  console.log(skills);
  return (
    <>
      <HStack w="100vw" gap={4}>
        <Heading>Job Position</Heading>
        <FormControl display="flex" flex={1} alignItems="center">
          <FormLabel>Is Hiring?</FormLabel>
          <Switch size="md" />
        </FormControl>
      </HStack>
      <Heading as="h4" size="md" mt={8}>
        Job Information
      </Heading>
      <HRInput
        label="Position name"
        isRequired
        placeholder="Placeholder Text"
      />
      <HRInput
        label="Employee number needed"
        isRequired
        placeholder="Placeholder Text"
      />
      <HRInput
        label="Maximum salary"
        isRequired
        placeholder="Placeholder Text"
      />
      <HRInput
        label="Job Description"
        isRequired
        placeholder="Placeholder Text"
      />
      <HStack align="center" justify="space-between">
        <HRSelect
          label="Criteria"
          w="50%"
          isRequired
          placeholder="Choose skills for criteria"
          options={[{ label: "Technical Skill", value: "Technical Skill" }]}
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
    </>
  );
};

export default CreatePosition;
