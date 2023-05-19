import Image from "next/image";

export default function Nav() {
  return (
    <div className="flex justify-between items-center h-full">
      <Image src="/logo.png" alt="Logo" width="85" height="85" />
      <nav>
        <a className="px-3 uppercase text-sm" href="#accueil">
          Accueil
        </a>
        <a className="px-3 uppercase text-sm" href="#services">
          Services
        </a>
        <a className="px-3 uppercase text-sm" href="#apropos">
          A propos
        </a>
        <a className="px-3 uppercase text-sm" href="#projets">
          Projets
        </a>
        <a className="px-3 uppercase text-sm" href="#">
          Équipe
        </a>
        <a className="px-3 uppercase text-sm" href="#">
          Tarifs
        </a>
        <a className="px-3 uppercase text-sm" href="#">
          Témoignages
        </a>
      </nav>
    </div>
  );
}
