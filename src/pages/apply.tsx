import { HRButton } from "@/components/HRButton";
import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";
import { Flex, FormControl, Image } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import Prisma from "../../libs/prisma";

export const getServerSideProps = async () => {
  // @ To Do: add condition to get 'hiring' position
  const data = await Prisma.position.findMany({});
  return {
    props: {
      positions: data,
    },
  };
};

const Apply = ({ positions }) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    expectedSalary: "",
    currentSalary: "",
    files: [],
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    position: false,
    expectedSalary: false,
    currentSalary: false,
  });

  const isValid =
    data.firstName &&
    data.lastName &&
    data.email &&
    data.phoneNumber &&
    data.position &&
    data.currentSalary &&
    data.expectedSalary &&
    data.files.length != 0;

  async function handleSubmit() {
    fetch("api/addCandidate", {
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        position: data.position,
        currentSalary: data.currentSalary,
        expectedSalary: data.expectedSalary,
        resumes: data.files,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(() => {
      setSuccess(true);
    });
  }

  const positionOptions = positions?.map((position) => {
    return {
      label: position.positionName,
      value: position.positionId.toString(),
    };
  });

  return (
    <Flex bg="background.secondary" w="100vw" h="100vh">
      <Image
        src="/hrbg.png"
        alt="background image"
        pos="absolute"
        top={0}
        left={0}
        w="100%"
      />
      <Flex
        zIndex={5}
        left={0}
        h="100vh"
        w="100vw"
        position="absolute"
        px={48}
        pt={32}
      >
        <Flex
          bg="background.primary"
          w="100%"
          p={24}
          flexDir="column"
          gap={8}
          overflow="scroll"
        >
          {success ? (
            <>
              <Typography variant="h1">Thank you for your interest</Typography>
              <Typography>We will contact you back shortly</Typography>
            </>
          ) : (
            <>
              <Typography variant="h1">Apply Now!</Typography>
              <Flex flexDir="column">
                <HRInput
                  label="First Name"
                  isRequired
                  id="firstName"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, firstName: true };
                    })
                  }
                  isInvalid={data.firstName == "" && touched.firstName}
                  errorMessage="Please enter your first name"
                />
                <HRInput
                  label="Last Name"
                  isRequired
                  id="lastName"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, lastName: true };
                    })
                  }
                  isInvalid={data.lastName == "" && touched.lastName}
                  errorMessage="Please enter your last name"
                />
                <HRInput
                  label="Email"
                  isRequired
                  id="email"
                  type="email"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, email: true };
                    })
                  }
                  isInvalid={
                    (data.email == "" && touched.email) ||
                    (!data.email.includes("@") &&
                      !data.email.includes(".com") &&
                      !!data.email)
                  }
                  errorMessage="Please enter a valid email"
                />
                <HRInput
                  label="Telephone Number"
                  isRequired
                  id="telephoneNumber"
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="XXXXXXXXXX"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, phoneNumber: true };
                    })
                  }
                  isInvalid={data.phoneNumber == "" && touched.phoneNumber}
                  errorMessage="Please enter a valid phone number"
                />
                <HRSelect
                  options={positionOptions}
                  label="Position"
                  placeholder={
                    positionOptions.length == 0
                      ? "No Position Available at this time"
                      : "Choose a position"
                  }
                  isRequired
                  isDisabled={positionOptions.length == 0}
                  id="position"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, position: e.target.value }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, position: true };
                    })
                  }
                  isInvalid={data.position == "" && touched.position}
                />
                <HRInput
                  label="Expected Salary"
                  isRequired
                  id="expectedSalary"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      expectedSalary: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, expectedSalary: true };
                    })
                  }
                  isInvalid={
                    data.expectedSalary == "" && touched.expectedSalary
                  }
                />
                <HRInput
                  label="Current Salary"
                  isRequired
                  id="currentSalary"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      currentSalary: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setTouched((prev) => {
                      return { ...prev, currentSalary: true };
                    })
                  }
                  isInvalid={data.currentSalary == "" && touched.currentSalary}
                />
                <HRInput
                  label="Resume / CV"
                  isRequired
                  type="file"
                  hidden
                  id="resume"
                  multiple
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, files: e.target.files }))
                  }
                />

                <HRButton variant="outline" w="fit-content">
                  <label htmlFor="resume">
                    {data.files.length != 0
                      ? Object.values(data.files)
                          .map((file) => file?.name)
                          .join(",")
                      : "Upload Files"}
                  </label>
                </HRButton>
                <Flex my={8} justify="flex-end">
                  <HRButton
                    type="submit"
                    isDisabled={!isValid}
                    onClick={handleSubmit}
                  >
                    Submit
                  </HRButton>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Apply;
