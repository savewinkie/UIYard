import ToolPageShell from "@/components/ToolPageShell";
import BlobGenerator from "@/components/tools/BlobGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("blob-generator");

export default function Page() {
  return (
    <ToolPageShell slug="blob-generator">
      <BlobGenerator />
    </ToolPageShell>
  );
}
