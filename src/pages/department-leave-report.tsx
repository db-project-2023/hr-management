import { HRInput } from "@/components/HRInput";
import { HRNumberCard } from "@/components/HRNumberCard";
import { HRTable } from "@/components/HRTable";
import { Typography } from "@/components/Typography";
import { Flex } from "@chakra-ui/react";
import { HStack, Heading, Stack } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { department, employee, leave_request } from "@prisma/client";
import Prisma from "../../libs/prisma";

function groupBy(xs, f) {
  return xs.reduce(
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
}

export const getStaticProps = async () => {
  const departments = await Prisma.department.findMany({});
  const leaveRequests = await Prisma.leave_request.findMany({});
  const employees = await Prisma.employee.findMany({});

  return {
    props: {
      departments,
      leaveRequests: leaveRequests.map((l) => ({
        ...l,
        startDate: l.startDate.toDateString(),
        endDate: l.endDate.toDateString(),
      })),
      employees: employees.map((e) => ({
        ...e,
        startDate: e.startDate.toDateString(),
      })),
    },
  };
};

const EmployeeRegisterForm = ({
  departments,
  leaveRequests,
  employees,
}: {
  departments: department[];
  leaveRequests: leave_request[];
  employees: employee[];
}) => {
  const leaveRequestByEmployee = groupBy(leaveRequests, (l) => l.employeeId);
  const le_keys = Object.keys(leaveRequestByEmployee);
  const le_values = Object.values(leaveRequestByEmployee);

  const leaveRequestSum = le_values.map((le) => ({
    employeeId: le[0].employeeId,
    sum: le.length,
  }));

  const employeeWithSum = employees.map((e) => ({
    ...e,
    ...leaveRequestSum.filter((l) => l.employeeId == e.employeeId)[0],
  }));

  const employeeByDepartment = groupBy(employeeWithSum, (e) => e.departmentId);
  const ed_keys = Object.keys(employeeByDepartment);
  const ed_values = Object.values(employeeByDepartment);

  const leaveByDepartment = ed_values.map((ed) =>
    ed.map((em) => ({ departmentId: em.departmentId, sum: em.sum }))
  );

  const sumLeaveByDepartment = leaveByDepartment.map((ld) => {
    let sum = 0;
    ld.forEach((l) => (sum += parseInt(l.sum)));
    return {
      departmentId: ld[0].departmentId,
      sum,
    };
  });

  console.log(sumLeaveByDepartment);
  return (
    <>
      <Heading>Department Leave Report</Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card>
          <CardBody>
            <Text fontSize="sm">Most Frequent Requests</Text>
          </CardBody>
          <CardHeader>
            <Heading size="md">
              {Math.max(...leaveRequestSum.map((l) => l.sum))}
            </Heading>
          </CardHeader>
        </Card>
      </SimpleGrid>
      <Heading as="h4" size="md">
        Department Leave Summary
      </Heading>
      <Flex flexDir="column" gap={8}>
        <Flex flexDir="column">
          <Flex w="100%" align="center" justify="space-between"></Flex>
          <HRTable
            headers={["", "Employees", "Leave Count"]}
            rows={departments.map((department) => [
              <Typography key={department.departmentId} variant="h3">
                {department.departmentName}
              </Typography>,
              <Typography key={department.departmentId}>
                {employeeByDepartment[department.departmentId]?.length ?? 0}
              </Typography>,
              <Typography key={department.departmentId}>
                {sumLeaveByDepartment.filter(
                  (sum) => sum.departmentId == department.departmentId
                )[0]?.sum ?? 0}
              </Typography>,
            ])}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default EmployeeRegisterForm;
