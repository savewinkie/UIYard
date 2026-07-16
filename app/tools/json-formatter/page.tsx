import ToolPageShell from "@/components/ToolPageShell";
import JsonFormatter from "@/components/tools/JsonFormatter";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("json-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="json-formatter">
      <JsonFormatter />
    </ToolPageShell>
  );
}
