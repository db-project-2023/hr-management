import { candidate } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<candidate>
) {
    const { firstName, lastName, email, phoneNumber, currentSalary, expectedSalary, position, resumes } = req.body
    try {
        await Prisma.candidate.create({
            data: {
                firstName,
                lastName,
                expectedSalary: parseInt(expectedSalary),
                previousSalary: parseInt(currentSalary),
                candidateStatus: "To Review",
                email: email,
                telephoneNumber: phoneNumber,
                positionId: parseInt(position),
            }
        })
        res.status(200).json({ message: "Success" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "Fail" })
    }
}