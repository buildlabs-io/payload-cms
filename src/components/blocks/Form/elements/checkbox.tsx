import { Controller } from "react-hook-form";

import Error from "./error";
import Width from "./width";

import type { ControlledFieldProps, FormField } from "./types";

import { Checkbox as CheckboxUi } from "@/components/ui/checkbox";
import Label from "@/components/ui/label";

export default function Checkbox({
  name,
  defaultValue,
  errors,
  label,
  control,
  required,
  width,
}: FormField<"checkbox"> & ControlledFieldProps) {
  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ?? false}
          rules={{ required: required ?? false }}
          render={({ field }) => (
            <CheckboxUi
              checked={field.value === true}
              id={name}
              name={field.name}
              onBlur={field.onBlur}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              ref={field.ref}
            />
          )}
        />
        <Label htmlFor={name}>
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
          {label}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
