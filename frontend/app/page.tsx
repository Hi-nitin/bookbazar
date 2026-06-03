import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud";
import Image from "next/image";
import Testimonials from "@/components/testimonials"
import FooterSection from "@/components/footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (

    <div>
      <Navbar />
      <HeroSection />

      <LogoCloud />
      <Testimonials />

    </div>
  );
}
