import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { Typography } from "./Typography";

type HRSelectOptionType = {
  label: string;
  value: string;
};

export type HRSelectType = SelectProps & {
  label?: string;
  options: HRSelectOptionType[];
  helperText?: string;
  errorMessage?: string;
};

export const HRSelect = (props: HRSelectType) => {
  const {
    label,
    options,
    helperText,
    errorMessage,
    isRequired,
    isInvalid,
    ...rest
  } = props;
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
      <Select
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
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
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
