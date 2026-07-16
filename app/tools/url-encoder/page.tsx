import ToolPageShell from "@/components/ToolPageShell";
import UrlEncoder from "@/components/tools/UrlEncoder";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("url-encoder");

export default function Page() {
  return (
    <ToolPageShell slug="url-encoder">
      <UrlEncoder />
    </ToolPageShell>
  );
}
