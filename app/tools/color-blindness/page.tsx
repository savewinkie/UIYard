import ToolPageShell from "@/components/ToolPageShell";
import ColorBlindSim from "@/components/tools/ColorBlindSim";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("color-blindness");

export default function Page() {
  return (
    <ToolPageShell slug="color-blindness">
      <ColorBlindSim />
    </ToolPageShell>
  );
}
