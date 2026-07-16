import ToolPageShell from "@/components/ToolPageShell";
import UrlSlugGenerator from "@/components/tools/UrlSlugGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("url-slug-generator");

export default function Page() {
  return (
    <ToolPageShell slug="url-slug-generator">
      <UrlSlugGenerator />
    </ToolPageShell>
  );
}
