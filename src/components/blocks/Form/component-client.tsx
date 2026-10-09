"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Checkbox from "./elements/checkbox";
import Country from "./elements/country";
import Email from "./elements/email";
import Message from "./elements/message";
import Number from "./elements/number";
import Select from "./elements/select";
import State from "./elements/state";
import Text from "./elements/text";
import Textarea from "./elements/textarea";

import type { FormBlockProps } from "@/lib/core/types/types";
import type { Form as PayloadForm } from "@/payload-types";
import type { FieldValues } from "react-hook-form";

import Button from "@/components/ui/button";
import RichText from "@/components/ui/rich-text";
import { postJson } from "@/lib/core/utilities";

export default function FormBlockClient({
  enableIntro,
  form,
  introContent,
  submitUrl,
  submitData,
  refreshOnSubmit,
}: FormBlockProps) {
  const formMethods = useForm();
  const formFields = form.fields as unknown as PayloadForm["fields"];

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();
  const t = useTranslations("blocks.form");

  const onSubmit = useCallback(
    (data: FieldValues) => {
      const submitForm = async () => {
        setError(undefined);
        setIsLoading(true);

        try {
          if (submitUrl) {
            await postJson(submitUrl, {
              ...submitData,
              ...data,
            });
          } else {
            await postJson("form-submissions", {
              form: form.id,
              submissionData: Object.entries(data).map(([field, value]) => ({
                field,
                value,
              })),
            });
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (form.confirmationType === "redirect" && form.redirect?.url) {
            router.push(form.redirect.url);
          } else if (refreshOnSubmit) {
            setTimeout(() => {
              router.refresh();
            }, 900);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: err instanceof Error ? err.message : t("submitError"),
          });
        }
      };

      void submitForm();
    },
    [form, router, t, submitUrl, submitData, refreshOnSubmit],
  );

  return (
    <div className="mx-auto max-w-lg">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-2" data={introContent} enableGutter={false} />
      )}

      <div className="rounded-[0.8rem] border border-border p-4 lg:p-6">
        <FormProvider {...formMethods}>
          {!hasSubmitted && (
            <form id={String(form.id)} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFields?.map((field, index) => {
                  let element;
                  switch (field.blockType) {
                    case "checkbox":
                      element = (
                        <Checkbox
                          {...field}
                          control={control}
                          errors={errors}
                        />
                      );
                      break;
                    case "country":
                      element = (
                        <Country {...field} control={control} errors={errors} />
                      );
                      break;
                    case "email":
                      element = (
                        <Email {...field} register={register} errors={errors} />
                      );
                      break;
                    case "message":
                      element = <Message {...field} />;
                      break;
                    case "number":
                      element = (
                        <Number
                          {...field}
                          register={register}
                          errors={errors}
                        />
                      );
                      break;
                    case "select":
                      element = (
                        <Select {...field} control={control} errors={errors} />
                      );
                      break;
                    case "state":
                      element = (
                        <State {...field} control={control} errors={errors} />
                      );
                      break;
                    case "text":
                      element = (
                        <Text {...field} register={register} errors={errors} />
                      );
                      break;
                    case "textarea":
                      element = (
                        <Textarea
                          {...field}
                          register={register}
                          errors={errors}
                        />
                      );
                      break;
                  }
                  return (
                    <div className="mb-6 last:mb-0" key={field.id ?? index}>
                      {element}
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="mb-4">{`${error.status || "500"}: ${error.message || ""}`}</div>
              )}

              <Button
                form={String(form.id)}
                eventName={form.title}
                type="submit"
                variant="default"
                disabled={isLoading}
                className="min-w-[9rem]"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {isLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  )}
                  <span>{form.submitButtonLabel}</span>
                </span>
              </Button>
            </form>
          )}

          {!isLoading &&
            hasSubmitted &&
            form.confirmationType === "message" && (
              <RichText data={form.confirmationMessage} />
            )}
        </FormProvider>
      </div>
    </div>
  );
}
