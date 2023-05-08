import { Button, ButtonProps, ChakraProps } from "@chakra-ui/react";

export type HRButtonType = Omit<ButtonProps, "variant"> & {
  variant?: HRButtonVariant;
};
export type HRButtonVariant = "contained" | "outline" | "ghost";

const HRButtonStyle: Record<HRButtonVariant, ChakraProps> = {
  contained: {
    background: "brand.primary",
    color: "white",
    _hover: {
      background: "brand.secondary",
    },
  },
  outline: {
    background: "transparent",
    color: "brand.primary",
    border: "1px solid",
    borderColor: "brand.primary",
  },
  ghost: {
    background: "transparent",
    color: "brand.primary",
  },
};

export const HRButton = (props: HRButtonType) => {
  const { variant = "contained", children, ...rest } = props;
  return (
    <Button
      background="brand.primary"
      color="white"
      variant={variant}
      borderRadius="3px"
      {...HRButtonStyle[variant]}
      {...rest}
    >
      {children}
    </Button>
  );
};
