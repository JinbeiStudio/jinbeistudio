import Nav from "@/components/molecules/nav";
import Banner from "@/components/molecules/banner";
import Services from "@/components/molecules/services";
import About from "@/components/molecules/about";
import Projects from "@/components/molecules/projects";
import Footer from "@/components/molecules/footer";

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
        <section id="services" className="container pt-20 pb-28 sm:pt-40 sm:pb-48 mx-auto max-w-5xl max-lg:px-8">
          <Services />
        </section>
        <section id="about" className="w-full">
          <About />
        </section>
        <section id="projects" className="container py-24 mx-auto max-w-5xl px-8 lg:px-0">
          <Projects />
        </section>
      </main>
      <footer className="h-20 bg-blue w-full text-white shadow-[0px_0px_3px_1px_rgba(0,0,0,0.4)]">
        <Footer />
      </footer>
    </>
  );
}
