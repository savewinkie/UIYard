import ToolPageShell from "@/components/ToolPageShell";
import ContrastChecker from "@/components/tools/ContrastChecker";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("contrast-checker");

export default function Page() {
  return (
    <ToolPageShell slug="contrast-checker">
      <ContrastChecker />
    </ToolPageShell>
  );
}
