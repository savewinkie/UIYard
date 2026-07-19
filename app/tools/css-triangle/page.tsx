import ToolPageShell from "@/components/ToolPageShell";
import CssTriangle from "@/components/tools/CssTriangle";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-triangle");

export default function Page() {
  return (
    <ToolPageShell slug="css-triangle">
      <CssTriangle />
    </ToolPageShell>
  );
}
