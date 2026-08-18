import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects delivered by Intellix across software, AI, and data analytics divisions."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work across every division"
        description="A selection of projects — full case studies available for each."
      />
      <PortfolioGrid />
    </>
  );
}
