import ToolPageShell from "@/components/ToolPageShell";
import CssGridGenerator from "@/components/tools/CssGridGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-grid-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-grid-generator">
      <CssGridGenerator />
    </ToolPageShell>
  );
}
