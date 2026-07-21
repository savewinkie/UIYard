import ToolPageShell from "@/components/ToolPageShell";
import TransparentBackground from "@/components/tools/TransparentBackground";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("transparent-background");

export default function Page() {
  return (
    <ToolPageShell slug="transparent-background">
      <TransparentBackground />
    </ToolPageShell>
  );
}
