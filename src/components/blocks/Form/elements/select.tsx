import { Controller } from "react-hook-form";

import Error from "./error";
import Width from "./width";

import type { ControlledFieldProps, FormField } from "./types";

import Label from "@/components/ui/label";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Select({
  name,
  control,
  errors,
  label,
  options,
  required,
  width,
  defaultValue,
}: FormField<"select"> & ControlledFieldProps) {
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
      <Controller
        control={control}
        defaultValue={defaultValue ?? ""}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options?.find((t) => t.value === value);

          return (
            <SelectComponent
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options?.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectComponent>
          );
        }}
        rules={{ required: required ?? false }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
