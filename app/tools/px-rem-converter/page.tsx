import ToolPageShell from "@/components/ToolPageShell";
import PxRemConverter from "@/components/tools/PxRemConverter";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("px-rem-converter");

export default function Page() {
  return (
    <ToolPageShell slug="px-rem-converter">
      <PxRemConverter />
    </ToolPageShell>
  );
}
