import ToolPageShell from "@/components/ToolPageShell";
import HexRgbConverter from "@/components/tools/HexRgbConverter";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("hex-rgb-converter");

export default function Page() {
  return (
    <ToolPageShell slug="hex-rgb-converter">
      <HexRgbConverter />
    </ToolPageShell>
  );
}
