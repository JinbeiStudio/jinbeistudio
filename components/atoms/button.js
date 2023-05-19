import React from "react";
import Link from "next/link";

export default function Button({ text, link }) {
  return (
    <button className="uppercase text-xl text font-bold text-white border-white border-2 p-2 transition-colors hover:bg-blue hover:border-blue duration-700 ease">
      <Link target="_blank" href={link}>
        {text}
      </Link>
    </button>
  );
}
