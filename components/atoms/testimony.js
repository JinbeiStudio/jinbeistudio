import React from 'react';
import Image from 'next/image';

export default function Testimony({ author, testimony, image }) {
  return (
    <div className="relative min-h-[550px] max-w-[315px] min-w-[315px] my-2 mr-4 max-sm:min-w-full">
      {author !== 'empty' ? (
        <div className="flex flex-col items-center justify-around max-w-[315px] px-1 py-4 max-sm:min-w-full">
          <h4 className="text-blue my-12 font-semibold text-lg text-center z-20">{author}</h4>
          <p className="text-white text-center font-light px-4 z-20 text-sm leading-6 whitespace-pre-line mt-8">{testimony}</p>
          <Image className="z-20 transform -scale-y-100 -scale-x-100 absolute bottom-12" src="/images/quote.svg" alt="Logo" width="34" height="34" />
          <Image className="object-cover absolute z-10" src={image} fill alt="author" />
          <div className="bg-blueBG opacity-80 min-w-full min-h-full z-10 absolute top-0"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center px-1 py-4 h-full justify-center">
          <div className="flex z-20">
            <div className="block min-h-[50px] min-w-[50px] bg-white border rounded-[50%] opacity-70 mx-2" />
            <div className="block min-h-[50px] min-w-[50px] bg-white border rounded-[50%] opacity-70 mx-2" />
            <div className="block min-h-[50px] min-w-[50px] bg-white border rounded-[50%] opacity-70 mx-2" />
          </div>
          <div className="bg-blueBG opacity-80 min-w-full min-h-full z-10 absolute top-0"></div>
        </div>
      )}
    </div>
  );
}
