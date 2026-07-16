import ToolPageShell from "@/components/ToolPageShell";
import BorderRadius from "@/components/tools/BorderRadius";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("border-radius");

export default function Page() {
  return (
    <ToolPageShell slug="border-radius">
      <BorderRadius />
    </ToolPageShell>
  );
}
