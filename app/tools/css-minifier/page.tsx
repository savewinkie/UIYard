import ToolPageShell from "@/components/ToolPageShell";
import CssMinifier from "@/components/tools/CssMinifier";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-minifier");

export default function Page() {
  return (
    <ToolPageShell slug="css-minifier">
      <CssMinifier />
    </ToolPageShell>
  );
}
