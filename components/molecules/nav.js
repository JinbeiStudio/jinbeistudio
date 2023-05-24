import Image from 'next/image';

export default function Nav() {
  return (
    <div className="flex justify-between items-center h-full max-w-5xl mx-auto max-sm:justify-center z-50">
      <Image src="/images/logo.png" alt="Logo" width="85" height="85" />
      <nav className="max-sm:hidden">
        <a className="px-3 uppercase text-sm transition-colors hover:text-blue ease-in-out duration-400" href="#home">
          Accueil
        </a>
        <a className="px-3 uppercase text-sm transition-colors hover:text-blue ease-in-out duration-400" href="#services">
          Services
        </a>
        <a className="px-3 uppercase text-sm transition-colors hover:text-blue ease-in-out duration-400" href="#about">
          À propos
        </a>
        <a className="px-3 uppercase text-sm transition-colors hover:text-blue ease-in-out duration-400" href="#projects">
          Projets
        </a>
        <a className="px-3 uppercase text-sm transition-colors hover:text-blue ease-in-out duration-400" href="#testimonies">
          Témoignages
        </a>
        <a className="px-3 uppercase text-sm transition-colors hover:text-blue ease-in-out duration-400" href="#contact">
          Contact
        </a>
      </nav>
    </div>
  );
}
