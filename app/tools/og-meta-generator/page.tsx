import ToolPageShell from "@/components/ToolPageShell";
import OgMetaGenerator from "@/components/tools/OgMetaGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("og-meta-generator");

export default function Page() {
  return (
    <ToolPageShell slug="og-meta-generator">
      <OgMetaGenerator />
    </ToolPageShell>
  );
}
