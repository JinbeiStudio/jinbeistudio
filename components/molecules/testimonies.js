import React from 'react';
import Title from '../atoms/title';
import Line from '../atoms/line';
import testimonies from '../../dictionaries/testimonies.json';
import Testimony from '../atoms/testimony';

export default function Testimonies() {
  return (
    <div className="relative flex justify-center h-[1587px] max-sm:min-h-[3800px] max-lg:min-h-[2100px] items-center">
      <div className="absolute w-full max-w-5xl z-20 max-lg:px-8">
        <Line />
        <Title title={'Les \n témoignages'} color="white" />
        <div className="flex flex-wrap mt-8">
          {testimonies.map(function (value, index) {
            return <Testimony key={index} author={value.author} testimony={value.testimony} image={value.image} />;
          })}
        </div>
      </div>
      <div className="bg-blue opacity-80 height-full absolute min-w-full h-[1587px] max-sm:min-h-[3800px] max-lg:min-h-[2100px] z-10"></div>
      <video className="w-full object-cover h-[1587px] max-sm:min-h-[3800px] max-lg:min-h-[2100px]" autoPlay loop muted playsinline>
        <source src="./videos/bubble.mp4" />
      </video>
    </div>
  );
}
