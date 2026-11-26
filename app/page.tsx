import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";
import PeekContact from "@/components/PeekContact";

// A sequence of full-width bands, each holding one idea.
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProfileCard />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactPanel />
      </main>
      <Footer />
      <PeekContact />
    </div>
  );
}
