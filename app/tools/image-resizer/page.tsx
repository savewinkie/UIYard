import ToolPageShell from "@/components/ToolPageShell";
import ImageResizer from "@/components/tools/ImageResizer";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("image-resizer");

export default function Page() {
  return (
    <ToolPageShell slug="image-resizer">
      <ImageResizer />
    </ToolPageShell>
  );
}
