import { BoxProps, Heading, Text, TextProps } from "@chakra-ui/react";

// Types
export type HeadingType = "h1" | "h2" | "h3";
export type TextType = "body1" | "body2" | "body3" | "description";
export type TypographyProps = BoxProps & {
  variant?: HeadingType | TextType;
};

// Styles
export const typographyStyles: Record<HeadingType | TextType, TextProps> = {
  h1: {
    fontSize: "24px",
    fontWeight: "semibold",
    color: "content.primary",
  },
  h2: {
    fontSize: "20px",
    fontWeight: "semibold",
    color: "content.primary",
  },
  h3: {
    fontSize: "16px",
    fontWeight: "semibold",
    color: "content.primary",
  },
  body1: {
    fontSize: "24px",
    color: "content.primary",
  },
  body2: {
    fontSize: "20px",
    color: "content.primary",
  },
  body3: {
    fontSize: "16px",
    color: "content.primary",
  },
  description: {
    fontSize: "12px",
    color: "content.description",
  },
};

export const Typography = (props: TypographyProps) => {
  const { variant = "body3", ...rest } = props;
  const isHeading = ["h1", "h2", "h3"].includes(variant);

  if (isHeading) return <Heading {...typographyStyles[variant]} {...rest} />;
  return <Text {...typographyStyles[variant]} {...rest} />;
};
