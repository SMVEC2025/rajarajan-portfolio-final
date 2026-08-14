"use client";
import NavBar from "@/app/components/NavBar";
import RdHeroV2 from "@/app/components/RdHeroV2/RdHeroV2";
import IdentityBand from "@/app/components/IdentityBand";
import InstitutionGrid from "@/app/components/InstitutionGrid";
import About from "@/app/components/About";
import InstagramReels from "@/app/components/InstagramReels";
import OriginStory from "@/app/components/OriginStory";
import LinkedInFeed from "@/app/components/LinkedInFeed";
import SelectedWork from "@/app/components/SelectedWork";
import Services from "@/app/components/Services";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div id="home" data-snap-section data-hero-v2>
        <RdHeroV2
          onSchedule={() => window.dispatchEvent(new CustomEvent("open-meeting-form"))}
        />
      </div>
      <About />
      <InstitutionGrid />
      <InstagramReels />
      {/* <OriginStory /> */}
      <LinkedInFeed />
      {/* <SelectedWork /> */}
      {/* <Services /> */}
      <Footer />
    </main>
  );
}
