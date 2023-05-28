import { candidate, employee } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<employee>
) {
    const {
        firstName,
        lastName,
        candidateId,
        email,
        telephoneNumber,
        houseNumber,
        street,
        province,
        zipCode,
        position,
        departmentId,
        startDate,
        salary
    } = req.body

    try {
        await Prisma.employee.create({
            data: {
                firstName,
                lastName,
                salary: parseInt(salary),
                startDate: new Date(startDate),
                positionId: parseInt(position),
                candidateId: parseInt(candidateId),
                telephoneNumber,
                email,
                departmentId: parseInt(departmentId),
                leave: {
                    createMany: {
                        data: [
                            {
                                year: 2023,
                                leaveType: "sick",
                                days: 20
                            },
                            {
                                year: 2023,
                                leaveType: "vacation",
                                days: 16
                            },
                            {
                                year: 2023,
                                leaveType: "personal",
                                days: 16
                            },
                            {
                                year: 2023,
                                leaveType: "maternity",
                                days: 30
                            },
                        ]
                    }
                },
                address: {
                    create: {
                        houseNumber,
                        street,
                        province,
                        zipcode: zipCode
                    }
                }
            }
        })
        res.status(200).json({ message: "Success" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Fail" })
    }
}