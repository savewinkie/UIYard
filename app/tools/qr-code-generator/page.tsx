import ToolPageShell from "@/components/ToolPageShell";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("qr-code-generator");

export default function Page() {
  return (
    <ToolPageShell slug="qr-code-generator">
      <QrCodeGenerator />
    </ToolPageShell>
  );
}
