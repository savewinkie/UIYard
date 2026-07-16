import ToolPageShell from "@/components/ToolPageShell";
import ColorMixer from "@/components/tools/ColorMixer";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("color-mixer");

export default function Page() {
  return (
    <ToolPageShell slug="color-mixer">
      <ColorMixer />
    </ToolPageShell>
  );
}
