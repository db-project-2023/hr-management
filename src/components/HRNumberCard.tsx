import { Flex } from "@chakra-ui/react";
import { Typography } from "./Typography";

export type HRNumberCardType = {
  number: number;
  title: string;
  description?: string;
};

export const HRNumberCard = (props: HRNumberCardType) => {
  const { number, title, description } = props;
  return (
    <Flex
      bg="background.primary"
      align="center"
      justify="center"
      px={6}
      py={3}
      borderRadius={3}
      w="fit-content"
      gap={4}
    >
      <Typography variant="h1" fontSize="4xl">
        {number}
      </Typography>
      <Flex flexDir="column">
        <Typography variant="h3">{title}</Typography>
        {description && (
          <Typography variant="description">{description}</Typography>
        )}
      </Flex>
    </Flex>
  );
};
