import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FeaturedPanel from "@/components/FeaturedPanel";
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

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 lg:flex-row lg:gap-10 lg:px-6 lg:py-12">
        <Sidebar />

        <div className="flex flex-1 flex-col gap-10">
          <FeaturedPanel />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactPanel />
        </div>
      </main>

      <Footer />
    </div>
  );
}
