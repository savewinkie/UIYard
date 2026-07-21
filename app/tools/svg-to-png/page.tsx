import ToolPageShell from "@/components/ToolPageShell";
import SvgToPng from "@/components/tools/SvgToPng";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("svg-to-png");

export default function Page() {
  return (
    <ToolPageShell slug="svg-to-png">
      <SvgToPng />
    </ToolPageShell>
  );
}
