import ToolPageShell from "@/components/ToolPageShell";
import ShadowGlass from "@/components/tools/ShadowGlass";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("shadow-glassmorphism");

export default function Page() {
  return (
    <ToolPageShell slug="shadow-glassmorphism">
      <ShadowGlass />
    </ToolPageShell>
  );
}
