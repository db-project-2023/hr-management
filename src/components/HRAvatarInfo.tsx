import { Avatar, HStack, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Typography } from "./Typography";

export type HRAvatarInfoType = {
  name: string;
  description?: string;
  src?: string;
};

export const HRAvatarInfo = (props: HRAvatarInfoType) => {
  const { name, description, src, ...rest } = props;
  return (
    <HStack
      border="1px solid"
      borderColor="border.item"
      borderRadius="3px"
      p={3}
      gap={1}
    >
      <Avatar src={src} name={name} size="sm" />
      <VStack align="flex-start" spacing={0}>
        <Typography>{name}</Typography>
        {description && (
          <Typography variant="description">{description}</Typography>
        )}
      </VStack>
    </HStack>
  );
};
