import ToolPageShell from "@/components/ToolPageShell";
import JwtDecoder from "@/components/tools/JwtDecoder";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("jwt-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="jwt-decoder">
      <JwtDecoder />
    </ToolPageShell>
  );
}
