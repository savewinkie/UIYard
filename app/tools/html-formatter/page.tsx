import ToolPageShell from "@/components/ToolPageShell";
import HtmlFormatter from "@/components/tools/HtmlFormatter";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("html-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="html-formatter">
      <HtmlFormatter />
    </ToolPageShell>
  );
}
