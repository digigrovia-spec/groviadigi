import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import AuditDashboard from "@/components/site/AuditDashboard";
import { RevealController } from "@/components/ui/reveal-controller";

export const metadata = {
  title: "Marketing Audit — Lamaira Travel",
  description: "Comprehensive marketing audit and growth roadmap for Lamaira Travel.",
};

export default function AuditPage() {
  return (
    <main className="bg-paper text-ink min-h-screen flex flex-col">
      <RevealController />
      <Nav />
      <div className="flex-grow pt-32 pb-20">
        <AuditDashboard />
      </div>
      <Footer />
    </main>
  );
}
