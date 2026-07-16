import ToolPageShell from "@/components/ToolPageShell";
import FontPairing from "@/components/tools/FontPairing";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("font-pairing");

export default function Page() {
  return (
    <ToolPageShell slug="font-pairing">
      <FontPairing />
    </ToolPageShell>
  );
}
