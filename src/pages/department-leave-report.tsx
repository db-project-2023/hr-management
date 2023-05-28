import { HRInput } from "@/components/HRInput";
import { HRNumberCard } from "@/components/HRNumberCard";
import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";
import { HStack, Heading, Stack } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'

const EmployeeRegisterForm = () => {
  return (
    <>
    <Heading>Department Leave Report</Heading>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      <Card>
        <CardBody>
          <Text fontSize='sm'>Most Leave Requested Department</Text>
        </CardBody>
        <CardHeader>
          <Heading size='md'>Engineering</Heading>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Text fontSize='sm'>Most Leave Approved Department</Text>
        </CardBody>
        <CardHeader>
          <Heading size='md'>Engineering</Heading>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <Text fontSize='sm'>Longest Leave Duration</Text>
        </CardBody>
        <CardHeader>
          <Heading size='md'>5 Days</Heading>
        </CardHeader>
      </Card>
    </SimpleGrid>
    <Heading as='h4' size='md'>Department Leave Summary</Heading>
    <Flex flexDir="column" gap={8}>
      
      <Flex flexDir="column">
        <Flex w="100%" align="center" justify="space-between">
        </Flex>
        <HRTable
          headers={["", "Employees", "Average Requests", "Average Durations", "Leave Summary"]}
          rows={[
            [
              <Flex key="position" flexDir="column">
                <Typography variant="h3">Engineer</Typography>
              </Flex>,
              <Typography key="employed">
                20
              </Typography>,
              <Typography key="employed">
                1
              </Typography>,
              <Typography key="employed">
                4 Days
              </Typography>,
              <Typography key="employed">
                1:1
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
                1
              </Typography>,
              <Typography key="employed">
                2 Days
              </Typography>,
              <Typography key="employed">
                1:1
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
                1 Days
              </Typography>,
              <Typography key="employed">
                1:2
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
                2
              </Typography>,
              <Typography key="employed">
                2 Days
              </Typography>,
              <Typography key="employed">
                1:1
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
                1
              </Typography>,
              <Typography key="employed">
                2 Days
              </Typography>,
              <Typography key="employed">
                1:1
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
