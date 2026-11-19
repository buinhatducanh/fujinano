import React from "react";
import HeroSlider from "../components/HeroSlider";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import BrandsSection from "../components/BrandsSection";
import ClientsSection from "../components/ClientsSection";
import CertificatesSection from "../components/CertificatesSection";
import QuoteSection from "../components/QuoteSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <BrandsSection />
      <ClientsSection />
      <CertificatesSection />
      <QuoteSection />
    </>
  );
}
