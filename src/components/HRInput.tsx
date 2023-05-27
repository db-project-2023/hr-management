import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import { Typography } from "./Typography";

export type HRInputType = InputProps & {
  label?: string;
  helperText?: string;
  errorMessage?: string;
};

export const HRInput = (props: HRInputType) => {
  const { label, helperText, errorMessage, isRequired, isInvalid, ...rest } =
    props;
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} mt={6}>
      {label && (
        <FormLabel
          fontWeight="normal"
          color="content.primary"
          requiredIndicator={<Box />}
          display="flex"
          gap={1}
          mb={1}
        >
          {isRequired && <Typography color="content.error">*</Typography>}
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          borderRadius={3}
          isRequired={isRequired}
          isInvalid={isInvalid}
          borderColor="border.item"
          bg="background.primary"
          _placeholder={{
            color: "border.item",
          }}
          focusBorderColor="brand.secondary"
          errorBorderColor="content.error"
          color="content.primary"
          {...rest}
        />
      </InputGroup>
      {isInvalid && errorMessage && (
        <FormErrorMessage color="content.error">
          {errorMessage}
        </FormErrorMessage>
      )}
      {(!isInvalid || !errorMessage) && (
        <FormHelperText color="content.description">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
