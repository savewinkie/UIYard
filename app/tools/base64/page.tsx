import ToolPageShell from "@/components/ToolPageShell";
import Base64Tool from "@/components/tools/Base64Tool";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("base64");

export default function Page() {
  return (
    <ToolPageShell slug="base64">
      <Base64Tool />
    </ToolPageShell>
  );
}
