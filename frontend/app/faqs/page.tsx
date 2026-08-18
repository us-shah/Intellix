import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import FAQ from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about working with Intellix."
};

export default function FAQsPage() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions" />
      <FAQ />
    </>
  );
}
