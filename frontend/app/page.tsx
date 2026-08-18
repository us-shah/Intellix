import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import TechMarquee from "@/components/home/TechMarquee";
import Stats from "@/components/home/Stats";
import Divisions from "@/components/home/Divisions";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import AcademySpotlight from "@/components/home/AcademySpotlight";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <TechMarquee />
      <Stats />
      <Divisions />
      <Services />
      <Process />
      <WhyChooseUs />
      <PortfolioPreview />
      <AcademySpotlight />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
