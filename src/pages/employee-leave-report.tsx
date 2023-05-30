import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { Flex, Stack } from "@chakra-ui/react";
import { employee, leave, leave_request } from "@prisma/client";
import { useState } from "react";
import Prisma from "../../libs/prisma";

const getDayDifference = (date1, date2) => {
  let difference = new Date(date2).getTime() - new Date(date1).getTime();
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  return totalDays;
};

export const getStaticProps = async () => {
  const data = await Prisma.employee.findMany({});
  const leaveData = await Prisma.leave.findMany({});
  const leaveRequestData = await Prisma.leave_request.findMany({});
  return {
    props: {
      employees: data.map((d) => ({
        firstName: d.firstName,
        lastName: d.lastName,
        employeeId: d.employeeId,
      })),
      leaveData,
      leaveRequestData: leaveRequestData.map((l) => ({
        ...l,
        startDate: l.startDate.toDateString(),
        endDate: l.endDate.toDateString(),
      })),
    },
  };
};

const EmployeeLeaveReport = ({
  employees,
  leaveData,
  leaveRequestData,
}: {
  employees: employee[];
  leaveData: leave[];
  leaveRequestData: leave_request[];
}) => {
  const [current, setCurrent] = useState();
  const employeesOptions = employees.map((e) => ({
    label: `${e.firstName} ${e.lastName}`,
    value: e.employeeId.toString(),
  }));

  const currentLeave = leaveData.filter((leave) => leave.employeeId == current);
  const currentLeaveRequest = leaveRequestData.filter(
    (leave) => leave.employeeId == current
  );

  const leaveType = [
    "Sick Leave",
    "Vacation Leave",
    "Personal Leave",
    "Maternity Leave",
  ];

  return (
    <Flex flexDir="column" gap={6}>
      <HRSelect
        label="Employee"
        options={employeesOptions}
        placeholder="Select Employee"
        onChange={(e) => setCurrent(e.target.value)}
      />
      {current && (
        <Stack gap={4}>
          <Typography>
            Total Leave Requests: {currentLeaveRequest.length}
          </Typography>
          <Stack>
            <Typography variant="h3">Total Leave Used by category:</Typography>
            <Typography>
              Sick Leave:{" "}
              {currentLeaveRequest.filter((c) => c.leaveType == "sick").length},{" "}
              {currentLeaveRequest
                .filter((c) => c.leaveType == "sick")
                .map((c) => getDayDifference(c.startDate, c.endDate))
                .reduce((sum, a) => sum + a, 0)}{" "}
              Days
            </Typography>
            <Typography>
              Vacation Leave:{" "}
              {
                currentLeaveRequest.filter((c) => c.leaveType == "vacation")
                  .length
              }
              ,{" "}
              {currentLeaveRequest
                .filter((c) => c.leaveType == "vacation")
                .map((c) => getDayDifference(c.startDate, c.endDate))
                .reduce((sum, a) => sum + a, 0)}{" "}
              Days
            </Typography>
            <Typography>
              Personal Leave:{" "}
              {
                currentLeaveRequest.filter((c) => c.leaveType == "personal")
                  .length
              }
              ,{" "}
              {currentLeaveRequest
                .filter((c) => c.leaveType == "personal")
                .map((c) => getDayDifference(c.startDate, c.endDate))
                .reduce((sum, a) => sum + a, 0)}{" "}
              Days
            </Typography>
            <Typography>
              Maternity Leave:{" "}
              {
                currentLeaveRequest.filter((c) => c.leaveType == "maternity")
                  .length
              }
              ,{" "}
              {currentLeaveRequest
                .filter((c) => c.leaveType == "maternity")
                .map((c) => getDayDifference(c.startDate, c.endDate))
                .reduce((sum, a) => sum + a, 0)}{" "}
              Days
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h3">Leave Left</Typography>
            <Typography>
              {currentLeave.map((c, i) => (
                <Typography key={i}>
                  {leaveType[i]} {c.days} Days
                </Typography>
              ))}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
};

export default EmployeeLeaveReport;
