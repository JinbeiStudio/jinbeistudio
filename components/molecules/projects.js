"use client";
import React from "react";
import Title from "../atoms/title";
import Line from "../atoms/line";
import Slider from "react-slick";
import ImageSlider from "../atoms/imageslider";
import { NextArrowSlider, PrevArrowSlider } from "../atoms/arrowslider";
import projects1 from "../../dictionaries/projects1.json";
import projects2 from "../../dictionaries/projects2.json";
import projects3 from "../../dictionaries/projects3.json";

export default function Projects() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    rows: 2,
    slidesPerRow: 1,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <PrevArrowSlider />,
    nextArrow: <NextArrowSlider />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Line color={"blue"} />
      <Title title={"Mes \n projets"} />
      <p className="mt-8 font-light max-w-md">
        Sont présentés ci-dessous les projets réalisés par Jinbei Studio que ce soit des sites web, des applications web, ou encore des applications
        mobiles.
      </p>
      <article>
        <div className="flex mt-8">
          <div className="mt-3">
            <Line color={"blue"} />
          </div>
          <h3 className="uppercase font-semibold tracking-widest text-2xl ml-4">Sites e-commerce</h3>
        </div>
        <div className="mt-4">
          <Slider {...settings}>
            {projects2.map(function (value, index) {
              return <ImageSlider key={index + value.alt} alt={value.alt} src={value.src} link={value.link} />;
            })}
          </Slider>
        </div>
      </article>
      <article className="mt-12">
        <div className="flex mt-8">
          <div className="mt-3">
            <Line color={"blue"} />
          </div>
          <h3 className="uppercase font-semibold tracking-widest text-2xl ml-4">Applications web & mobile</h3>
        </div>
        <div className="mt-4">
          <Slider {...settings}>
            {projects3.map(function (value, index) {
              return <ImageSlider key={index + value.alt} alt={value.alt} src={value.src} link={value.link} />;
            })}
          </Slider>
        </div>
      </article>
      <article className="mt-12">
        <div className="flex">
          <div className="mt-3">
            <Line color={"blue"} />
          </div>
          <h3 className="uppercase font-semibold tracking-widest text-2xl ml-4">Sites vitrine</h3>
        </div>
        <div className="mt-4">
          <Slider {...settings}>
            {projects1.map(function (value, index) {
              return <ImageSlider key={index + value.alt} alt={value.alt} src={value.src} link={value.link} />;
            })}
          </Slider>
        </div>
      </article>
    </div>
  );
}
