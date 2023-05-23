import React from 'react';

export default function Title({ title, color }) {
  return (
    <h2
      className={
        color === 'white'
          ? 'text-white text-6xl uppercase font-bold whitespace-pre-line max-sm:text-4xl'
          : 'text-black text-6xl uppercase font-bold whitespace-pre-line max-sm:text-4xl'
      }
    >
      {title}
    </h2>
  );
}
