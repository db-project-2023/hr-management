import { HRInput } from "@/components/HRInput";
import { HRNumberCard } from "@/components/HRNumberCard";
import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";
import { HStack, Heading, Stack } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const EmployeeRegisterForm = () => {
  return (
    <>
    <Heading>Hiring Report</Heading>
    <Heading as='h4' size='md'>Candidate Department Summary</Heading>
    <Flex flexDir="column" gap={8}>
      
      <Flex flexDir="column">
        <Flex w="100%" align="center" justify="space-between">
        </Flex>
        <HRTable
          headers={["", "Register", "Resume Pass", "Interview Pass", "Pending"]}
          rows={[
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Engineer</Typography>
              </Flex>,
              <Typography key="employed">
                20
              </Typography>,
              <Typography key="employed">
                10
              </Typography>,
              <Typography key="employed">
                5
              </Typography>,
              <Typography key="employed">
                5
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">UX/UI</Typography>
              </Flex>,
              <Typography key="employed">
                8
              </Typography>,
              <Typography key="employed">
                4
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Product Manager</Typography>
              </Flex>,
              <Typography key="employed">
                4
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Marketing</Typography>
              </Flex>,
              <Typography key="employed">
                8
              </Typography>,
              <Typography key="employed">
                3
              </Typography>,
              <Typography key="employed">
                3
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Customer Relations</Typography>
              </Flex>,
              <Typography key="employed">
                10
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
              <Typography key="employed">
                1
              </Typography>,
              <Typography key="employed">
                1
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Customer Relations</Typography>
              </Flex>,
              <Typography key="employed">
                8
              </Typography>,
              <Typography key="employed">
                3
              </Typography>,
              <Typography key="employed">
                3
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
            ],
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Back-end</Typography>
              </Flex>,
              <Typography key="employed">
                10
              </Typography>,
              <Typography key="employed">
                2
              </Typography>,
              <Typography key="employed">
                1
              </Typography>,
              <Typography key="employed">
                1
              </Typography>,
            ],
          ]}
        />
      </Flex>
    </Flex>
    </>
  );
};

export default EmployeeRegisterForm;
