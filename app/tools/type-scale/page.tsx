import ToolPageShell from "@/components/ToolPageShell";
import TypeScale from "@/components/tools/TypeScale";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("type-scale");

export default function Page() {
  return (
    <ToolPageShell slug="type-scale">
      <TypeScale />
    </ToolPageShell>
  );
}
