import Error from "./error";
import Width from "./width";

import type { FormField, RegisteredFieldProps } from "./types";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";

export default function Email({
  name,
  errors,
  label,
  register,
  required,
  width,
}: FormField<"email"> & RegisteredFieldProps) {
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
        id={name}
        type="email"
        autoComplete="email"
        {...register(name, {
          pattern: /^\S[^\s@]*@\S+$/,
          required: required ?? false,
        })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
}
