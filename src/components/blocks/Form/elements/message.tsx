import Width from "./width";

import type { FormField } from "./types";

import RichText from "@/components/ui/rich-text";

export default function Message({ message }: FormField<"message">) {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  );
}
