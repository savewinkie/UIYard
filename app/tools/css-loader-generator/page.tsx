import ToolPageShell from "@/components/ToolPageShell";
import CssLoaderGenerator from "@/components/tools/CssLoaderGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("css-loader-generator");

export default function Page() {
  return (
    <ToolPageShell slug="css-loader-generator">
      <CssLoaderGenerator />
    </ToolPageShell>
  );
}
