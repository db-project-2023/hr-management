import { HRSidebar, SidebarItemType } from "@/components/HRSidebar";
import { theme } from "@/styles/theme";
import { AddIcon, BellIcon, InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

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
  return (
    <ChakraProvider theme={theme}>
      <HRSidebar items={sidebarItems} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
