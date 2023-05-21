import Image from "next/image";
import Title from "../atoms/title";
import Line from "../atoms/line";
import Button from "../atoms/button";

export default function About() {
  return (
    <div className="h-[637px] relative flex justify-center">
      <div className="absolute top-[60px] sm:top-[125px] w-full max-w-5xl z-20 max-lg:px-8">
        <Line color={"white"} />
        <Title color={"white"} title={"Jinbei \n Studio"} />
        <p className="text-white mt-8 max-w-2xl font-light">
          Fondé par Julien Gabriel, Jinbei Studio est une entreprise de création de sites internet, d&apos;applications web et mobile. Vous avez envie
          d&apos;avoir une application performante pour un besoin spécifique ? Vous lancez votre entreprise et vous avez besoin d&apos;un site web
          afin d&apos;établir votre présence sur le net ? Jinbei Studio est là pour vous conseiller et vous apporter les solutions techniques adaptées
          à vos différents projets.
        </p>
        <div className="mt-12">
          <Button text={"Curriculum Vitae"} link={"/documents/cv.pdf"} />
        </div>
      </div>
      <div className="bg-blue opacity-50  height-full absolute min-w-full h-[637px] z-10"></div>
      <video className="w-full object-cover h-[637px]" autoPlay loop muted>
        <source src="./videos/water.mp4" />
      </video>
    </div>
  );
}
