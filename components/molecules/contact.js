import React from 'react';
import Title from '../atoms/title';
import Line from '../atoms/line';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <div>
      <Line color={'blue'} />
      <Title title={'Me \n contacter'} />
      <p className="mt-8 font-semibold">N&apos;hésitez pas à me contacter</p>
      <p className="my-4">Jinbei Studio, Julien Gabriel</p>
      <address className="mt-4 flex flex-col">
        <a className="font-semibold not-italic text-blue" href="mailto:julien@jinbeistudio.com">
          julien@jinbeistudio.com
        </a>
        <a className="font-semibold not-italic text-blue" href="tel:+33681880095">
          06 81 88 00 95
        </a>
      </address>
      <div className="mt-4 flex">
        <Link className="mr-2" href="https://fr.linkedin.com/in/juliengabrielfr" target="_blank">
          <Image src="/images/linkedin.svg" width="40" height="40" alt="Linkedin Julien Gabriel Jinbei Studio" />
        </Link>
        <Link className="mr-2" href="https://www.instagram.com/julien_et_cindy" target="_blank">
          <Image src="/images/instagram.svg" width="40" height="40" alt="Instagram Julien Gabriel Jinbei Studio" />
        </Link>
        <Link href="https://www.facebook.com/JinbeiStudioJG" target="_blank">
          <Image src="/images/facebook.svg" width="40" height="40" alt="Facebook Julien Gabriel Jinbei Studio" />
        </Link>
      </div>
    </div>
  );
}
