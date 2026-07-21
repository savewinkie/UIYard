import ToolPageShell from "@/components/ToolPageShell";
import BackgroundPattern from "@/components/tools/BackgroundPattern";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-background-pattern");

export default function Page() {
  return (
    <ToolPageShell slug="css-background-pattern">
      <BackgroundPattern />
    </ToolPageShell>
  );
}
