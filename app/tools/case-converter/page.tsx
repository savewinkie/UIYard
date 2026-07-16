import ToolPageShell from "@/components/ToolPageShell";
import CaseConverter from "@/components/tools/CaseConverter";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("case-converter");

export default function Page() {
  return (
    <ToolPageShell slug="case-converter">
      <CaseConverter />
    </ToolPageShell>
  );
}
