import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoBar } from "@/components/landing/logo-bar";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { AIFlowViz } from "@/components/landing/ai-flow-viz";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="relative" data-testid="landing-page">
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <AIFlowViz />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
