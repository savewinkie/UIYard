import ToolPageShell from "@/components/ToolPageShell";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("password-generator");

export default function Page() {
  return (
    <ToolPageShell slug="password-generator">
      <PasswordGenerator />
    </ToolPageShell>
  );
}
