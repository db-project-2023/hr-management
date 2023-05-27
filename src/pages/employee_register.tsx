import { HRInput } from "@/components/HRInput";
import { HRSelect } from "@/components/HRSelect";
import { Typography } from "@/components/Typography";

const EmployeeRegisterForm = () => {
  return (
    <>
      <HRInput
        label="Label Text"
        isRequired
        placeholder="test"
        helperText="This is a helper text"
      />
      <HRSelect
        label="Label Text"
        isRequired
        placeholder="placeholder"
        helperText="This is a helper text"
        options={[{ label: "Test", value: "test" }]}
      />
    </>
  );
};

export default EmployeeRegisterForm;
