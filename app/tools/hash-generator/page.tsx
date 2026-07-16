import ToolPageShell from "@/components/ToolPageShell";
import HashGenerator from "@/components/tools/HashGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("hash-generator");

export default function Page() {
  return (
    <ToolPageShell slug="hash-generator">
      <HashGenerator />
    </ToolPageShell>
  );
}
