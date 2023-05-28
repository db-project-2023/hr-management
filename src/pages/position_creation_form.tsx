import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { HStack, Heading, Stack } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const EmployeeRegisterForm = () => {
  return (
    <>
    <HStack>
    <Heading>Job Position</Heading>
    <Switch size='md' /></HStack>
    <Heading as='h4' size='md'>
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
      {/* <HRSelect
        label="Criteria"
        isRequired
        placeholder="Technical Skills"
        options={[{ label: "Test", value: "test" }]}
      /> */}
      <Heading as='h4' size='md'>
      Criteria
      </Heading>
      <Stack spacing={3}>
      <Text fontSize='md'>* Technical Skills</Text>
      <Text fontSize='md'>* Exper</Text>
      <Text fontSize='md'>* Veral Communication</Text>
      <Text fontSize='md'>* Enthusiaam</Text>
      <Text fontSize='md'>* Teamwork</Text>
      <Text fontSize='md'>* Knowledge about the company</Text>
      <Button colorScheme='orange'>+ Add Criteria</Button>
      </Stack>
    </>
  );
};

export default EmployeeRegisterForm;
