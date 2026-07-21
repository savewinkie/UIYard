import ToolPageShell from "@/components/ToolPageShell";
import ImageToBase64 from "@/components/tools/ImageToBase64";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("image-to-base64");

export default function Page() {
  return (
    <ToolPageShell slug="image-to-base64">
      <ImageToBase64 />
    </ToolPageShell>
  );
}
