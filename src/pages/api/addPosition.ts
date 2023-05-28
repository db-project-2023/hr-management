import { candidate, position } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<position>
) {
    const { positionName, required, maxSalary, minSalary, jobDescription, isHiring, department, criteria } = req.body

    try {
        await Prisma.position.create({
            data: {
                positionName,
                status: isHiring ? "Hiring" : "Not Hiring",
                noOfRequiredEmployee: required,
                salaryRangeHigh: parseInt(maxSalary),
                salaryRangeLow: parseInt(minSalary),
                positionDescription: jobDescription,
                departmentId: department,
            }
        })
        res.status(200).json({ message: "Success" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Fail" })
    }
}