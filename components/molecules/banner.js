import Image from "next/image";

export default function Banner() {
  return (
    <div>
      <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center flex-col">
          <Image src="/images/logo-white.png" alt="Logo White" width="410" height="410" />
          <h1 className="text-white uppercase text-3xl mt-4 font-semibold tracking-widest text-center">Développeur Fullstack</h1>
        </div>
      </div>
      <div className="bg-blue opacity-20  height-full absolute min-w-full h-[609px] z-10"></div>
      <video className="w-full h-[609px] object-cover" autoPlay loop muted>
        <source src="/videos/sea-banner.mp4" />
      </video>
    </div>
  );
}
