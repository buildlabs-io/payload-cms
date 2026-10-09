import Error from "./error";
import Width from "./width";

import type { FormField, RegisteredFieldProps } from "./types";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";

export default function Text({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
}: FormField<"text"> & RegisteredFieldProps) {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue ?? undefined}
        id={name}
        type="text"
        {...register(name, { required: required ?? false })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
