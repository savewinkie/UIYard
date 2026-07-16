import ToolPageShell from "@/components/ToolPageShell";
import WhitespaceRemover from "@/components/tools/WhitespaceRemover";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("whitespace-remover");

export default function Page() {
  return (
    <ToolPageShell slug="whitespace-remover">
      <WhitespaceRemover />
    </ToolPageShell>
  );
}
