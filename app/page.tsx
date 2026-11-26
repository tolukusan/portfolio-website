import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 lg:px-6 lg:py-12">
        <Hero />
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <ProfileCard />
          <SkillsSection />
        </div>
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactPanel />
      </main>

      <Footer />
    </div>
  );
}
