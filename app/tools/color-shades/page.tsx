import ToolPageShell from "@/components/ToolPageShell";
import ColorShades from "@/components/tools/ColorShades";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("color-shades");

export default function Page() {
  return (
    <ToolPageShell slug="color-shades">
      <ColorShades />
    </ToolPageShell>
  );
}
