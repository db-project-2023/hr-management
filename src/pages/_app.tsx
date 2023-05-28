import { HRSidebar, SidebarItemType } from "@/components/HRSidebar";
import { theme } from "@/styles/theme";
import { AddIcon, BellIcon, InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/inter";
import { useRouter } from "next/router";
import { HRSelect } from "@/components/HRSelect";
import {
  BsPersonFillAdd,
  BsFillBuildingFill,
  BsFillClipboardPlusFill,
  BsPersonWorkspace,
  BsPeopleFill,
} from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { TbReport } from "react-icons/tb";

const sidebarItems: SidebarItemType[] = [
  {
    name: "Register Employee",
    path: "/employee_register",
    icon: <BsPersonFillAdd size="24px" />,
  },
  {
    name: "Leave Request",
    path: "/leave-request",
    icon: <BsFillClipboardPlusFill size="24px" />,
  },
  {
    name: "Create Position",
    path: "/create-position",
    icon: <BsPersonWorkspace size="24px" />,
  },
  {
    name: "Candidates",
    path: "/candidates",
    icon: <BsPeopleFill size="24px" />,
  },
  {
    name: "Leave Report",
    path: "/department-leave-report",
    icon: <TbReport size="24px" />,
  },
  {
    name: "Hiring Report",
    path: "/hiring-report",
    icon: <HiDocumentReport size="24px" />,
  },
  {
    name: "Company Report",
    path: "/company",
    icon: <BsFillBuildingFill size="24px" />,
  },
];

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <ChakraProvider theme={theme}>
      {asPath != "/apply" ? (
        <>
          <HRSidebar items={sidebarItems} />
          <Box
            w="82vw"
            h="100vh"
            pos="absolute"
            top={0}
            right={0}
            p={16}
            overflow="scroll"
            bg="background.secondary"
          >
            <Component {...pageProps} />
          </Box>{" "}
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  );
}
