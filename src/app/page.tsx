import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import FloatingActions from "@/components/FloatingActions";
import MascotWidget from "@/components/MascotWidget";
import Hero from "@/components/Hero";
import PartnershipSection from "@/components/PartnershipSection";
import {
  CtaBanner,
  GallerySection,
  ProcessSection,
  TestimonialsSection,
  WhySection,
} from "@/components/Sections";
import ServicesSection from "@/components/ServicesSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getServices } from "@/db/seed";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = await getServices();
  const options = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    division: service.division,
  }));

  return (
    <>
      <SiteHeader />
      <main className="pb-20 sm:pb-0">
        <Hero />
        <ServicesSection services={services} />
        <PartnershipSection />
        <AboutSection />
        <WhySection />
        <ProcessSection />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
        <CtaBanner />
        <ContactSection services={options} />
      </main>
      <SiteFooter />
      <FloatingActions />
      <MascotWidget />
    </>
  );
}
