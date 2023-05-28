import { boxShadow } from "@/styles/boxShadow";
import { Box, Flex, HStack, Link, Stack } from "@chakra-ui/react";
import { HRAvatarInfo } from "./HRAvatarInfo";
import { Typography } from "./Typography";
import NextLink from "next/link";
import { ReactNode } from "react";

export type SidebarItemType = {
  icon?: ReactNode;
  name: string;
  path: string;
};

export type HRSidebarType = {
  items: SidebarItemType[];
};

export const HRSidebar = (props: HRSidebarType) => {
  const { items } = props;
  return (
    <Stack
      w="18vw"
      h="100vh"
      pos="absolute"
      top={0}
      left={0}
      bg="background.primary"
      boxShadow={boxShadow}
      p={6}
      zIndex={99}
      justifyContent="space-between"
    >
      <Link as={NextLink} href="/" _hover={{ textDecor: "none" }}>
        <Typography variant="h2" color="brand.primary">
          HRM
        </Typography>
      </Link>
      <Stack>
        {items.map((item) => (
          <Link
            as={NextLink}
            key={item.name}
            href={item.path}
            _hover={{ textDecor: "none", bg: "brand.secondary" }}
            borderRadius={3}
            p={4}
            color="content.primary"
          >
            <Flex align="center" gap={2} justify="flex-start">
              {item.icon}
              {item.name}
            </Flex>
          </Link>
        ))}
      </Stack>
      {/*<HRAvatarInfo name="Pichy" description="UI Engineer" />*/}
      <Box></Box>
    </Stack>
  );
};
