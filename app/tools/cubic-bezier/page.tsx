import ToolPageShell from "@/components/ToolPageShell";
import EasingEditor from "@/components/tools/EasingEditor";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("cubic-bezier");

export default function Page() {
  return (
    <ToolPageShell slug="cubic-bezier">
      <EasingEditor />
    </ToolPageShell>
  );
}
