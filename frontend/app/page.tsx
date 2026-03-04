import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud";
import Image from "next/image";
import Testimonials from "@/components/testimonials"
import FooterSection from "@/components/footer";

export default function Home() {
  return (

    <div>

      <HeroSection />

      <LogoCloud />
      <Testimonials />

    </div>
  );
}
