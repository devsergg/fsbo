import HeroSection from "@/components/HeroSection";
import PropertyListings from "@/components/PropertyListings";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PropertyListings />
      <MissionSection />
      <Footer />
    </main>
  );
}
