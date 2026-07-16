import ToolPageShell from "@/components/ToolPageShell";
import GradientMaker from "@/components/tools/GradientMaker";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-gradient-maker");

export default function Page() {
  return (
    <ToolPageShell slug="css-gradient-maker">
      <GradientMaker />
    </ToolPageShell>
  );
}
