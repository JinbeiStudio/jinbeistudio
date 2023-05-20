import Nav from "@/components/molecules/nav";
import Banner from "@/components/molecules/banner";
import Services from "@/components/molecules/services";
import About from "@/components/molecules/about";
import Projects from "@/components/molecules/projects";

export default function Home() {
  return (
    <>
      <header className="justify-center h-24 mx-auto sticky top-0 bg-white z-50 w-full">
        <Nav />
      </header>
      <main>
        <section className="w-full">
          <Banner />
        </section>
        <section id="services" className="container pt-40 pb-48 mx-auto max-w-4xl">
          <Services />
        </section>
        <section id="about" className="w-full">
          <About />
        </section>
        {/* <section id="projects" className="container py-32 mx-auto max-w-4xl">
          <Projects />
        </section> */}
      </main>
    </>
  );
}
