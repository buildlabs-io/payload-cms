import type { Form } from "@/payload-types";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export type FormField<
  Type extends NonNullable<Form["fields"]>[number]["blockType"],
> = Extract<NonNullable<Form["fields"]>[number], { blockType: Type }>;

export type RegisteredFieldProps = {
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
};

export type ControlledFieldProps = {
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
};
