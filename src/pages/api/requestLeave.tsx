import { candidate, employee } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<employee>
) {
  const { leaveType, startDate, endDate, employeeId } = req.body;

  let difference = new Date(endDate).getTime() - new Date(startDate).getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

  try {
    await Prisma.leave_request.create({
      data: {
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        employeeId: parseInt(employeeId),
        status: "Approved",
      },
    });
    await Prisma.leave.update({
      where: {
        year_employeeId_leaveType: {
          year: 2023,
          employeeId: parseInt(employeeId),
          leaveType,
        },
      },
      data: {
        days: {
          decrement: TotalDays,
        },
      },
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail" });
  }
}
