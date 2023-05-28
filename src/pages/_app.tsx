import { HRSidebar, SidebarItemType } from "@/components/HRSidebar";
import { theme } from "@/styles/theme";
import { AddIcon, BellIcon, InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/inter";
import { useRouter } from "next/router";

const sidebarItems: SidebarItemType[] = [
  {
    name: "Register Employee",
    path: "/employee_register",
    icon: <AddIcon />,
  },
  {
    name: "Company",
    path: "/company",
    icon: <InfoIcon boxSize="24px" />,
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
