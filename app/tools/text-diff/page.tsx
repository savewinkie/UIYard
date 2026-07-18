import ToolPageShell from "@/components/ToolPageShell";
import TextDiff from "@/components/tools/TextDiff";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("text-diff");

export default function Page() {
  return (
    <ToolPageShell slug="text-diff">
      <TextDiff />
    </ToolPageShell>
  );
}
