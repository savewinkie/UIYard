import ToolPageShell from "@/components/ToolPageShell";
import LoremIpsum from "@/components/tools/LoremIpsum";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("lorem-ipsum");

export default function Page() {
  return (
    <ToolPageShell slug="lorem-ipsum">
      <LoremIpsum />
    </ToolPageShell>
  );
}
