import Error from "./error";
import Width from "./width";

import type { FormField, RegisteredFieldProps } from "./types";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";

export default function Number({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
}: FormField<"number"> & RegisteredFieldProps) {
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
        type="number"
        {...register(name, {
          required: required ?? false,
          valueAsNumber: true,
        })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
