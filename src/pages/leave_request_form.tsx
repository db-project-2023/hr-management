import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { HStack, Heading, Stack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'

const EmployeeRegisterForm = () => {
  return (
    <>
      <Heading>Leave Request</Heading>
      <HRInput
        label="Leave Type"
        isRequired
        placeholder="Text"
      />
      <HRInput
        label="Leave Date"
        type="date"
        isRequired
        placeholder="Date"
      />
      <HRInput
        label="Attachments"
        type="file"
        isRequired
        placeholder="File"
      />
      <Heading as='h4' size='md'>For Manager</Heading>
      <RadioGroup defaultValue='1'>
      <Stack spacing={5} direction='row'>
      <Radio colorScheme='orange' value='1'>Approve</Radio>
      <Radio colorScheme='orange' value='2'>Deny</Radio>
    </Stack></RadioGroup>
      <HRInput
        label="Reasons/Comments"
        placeholder="Placeholder Text"
      />
    </>
  );
};

export default EmployeeRegisterForm;
