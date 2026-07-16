import ToolPageShell from "@/components/ToolPageShell";
import PaletteGenerator from "@/components/tools/PaletteGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("color-palette-generator");

export default function Page() {
  return (
    <ToolPageShell slug="color-palette-generator">
      <PaletteGenerator />
    </ToolPageShell>
  );
}
