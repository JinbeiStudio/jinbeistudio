import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function ImageSlider({ src, alt, link }) {
  return (
    <div className="relative">
      <div className="w-[350px] h-[220px] overflow-hidden">
        <Image className="p-2 object-cover" fill src={src} alt={alt} />
      </div>
      <Link href={link} target="_blank">
        <div className="m-2 flex justify-center items-center text-white font-semibold text-xl w-[326px] h-[204px] bg-blue absolute top-0 opacity-0 transition hover:opacity-90">
          {alt}
        </div>
      </Link>
    </div>
  );
}
