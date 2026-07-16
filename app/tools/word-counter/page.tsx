import ToolPageShell from "@/components/ToolPageShell";
import WordCounter from "@/components/tools/WordCounter";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("word-counter");

export default function Page() {
  return (
    <ToolPageShell slug="word-counter">
      <WordCounter />
    </ToolPageShell>
  );
}
