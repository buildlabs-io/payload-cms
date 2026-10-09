import Error from "./error";
import Width from "./width";

import type { FormField, RegisteredFieldProps } from "./types";

import Label from "@/components/ui/label";
import TextAreaComponent from "@/components/ui/textarea";

export default function Textarea({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
}: FormField<"textarea"> & RegisteredFieldProps) {
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

      <TextAreaComponent
        defaultValue={defaultValue ?? undefined}
        id={name}
        rows={3}
        {...register(name, { required: required ?? false })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
}
