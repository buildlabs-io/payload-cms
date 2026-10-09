import { Controller } from "react-hook-form";

import Error from "./error";
import { stateOptions } from "./state-options";
import Width from "./width";

import type { ControlledFieldProps, FormField } from "./types";

import Label from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function State({
  name,
  control,
  errors,
  label,
  required,
  width,
}: FormField<"state"> & ControlledFieldProps) {
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
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = stateOptions.find((t) => t.value === value);

          return (
            <Select
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }}
        rules={{ required: required ?? false }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
}
