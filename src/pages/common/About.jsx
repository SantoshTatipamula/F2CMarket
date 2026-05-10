import AboutFarmers from "@/components/common/about/AboutFarmers";
import AboutHero from "@/components/common/about/AboutHero";
import AboutMission from "@/components/common/about/AboutMission";
import AboutStory from "@/components/common/about/AboutStory";
import AppStats from "@/components/common/about/AboutStats"

const About = () => {
  return (
    <main className="bg-[var(--bg)]">
      <AboutHero />
      <AboutStory/>
      <AboutMission/>
      <AboutFarmers/>
      <AppStats/>
    </main>
  );
};

export default About;