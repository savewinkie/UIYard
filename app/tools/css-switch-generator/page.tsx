import ToolPageShell from "@/components/ToolPageShell";
import CssSwitch from "@/components/tools/CssSwitch";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-switch-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-switch-generator">
      <CssSwitch />
    </ToolPageShell>
  );
}
