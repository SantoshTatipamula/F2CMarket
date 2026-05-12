import AboutHero from "@/components/common/about/AboutHero";
import AboutStory from "@/components/common/about/AboutStory";
import AboutMission from "@/components/common/about/AboutMission";
import AppStats from "@/components/common/about/AboutStats";

const About = () => {
  return (
    <main className="bg-[var(--bg)]">
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AppStats />
    </main>
  );
};

export default About;
