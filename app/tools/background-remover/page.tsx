import ToolPageShell from "@/components/ToolPageShell";
import BackgroundRemover from "@/components/tools/BackgroundRemover";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("background-remover");

export default function Page() {
  return (
    <ToolPageShell slug="background-remover">
      <BackgroundRemover />
    </ToolPageShell>
  );
}
