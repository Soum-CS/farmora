import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import ProblemSection from "../../components/landing/ProblemSection";
import PlatformSection from "../../components/landing/PlatformSection";
import Workflow from "../../components/landing/Workflow";
import FeatureGrid from "../../components/landing/FeatureGrid";
import RoleSection from "../../components/landing/RoleSection";
import ImpactSection from "../../components/landing/ImpactSection";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/layout/Footer";


function Home() {
  return (
    <div className="home-wrapper">
      <Navbar />
      <Hero />
      <ProblemSection />
      <PlatformSection />
      <Workflow />
      <FeatureGrid />
      <RoleSection />
      <ImpactSection />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;