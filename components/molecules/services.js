"use client";
import React, { useRef } from "react";
import Title from "../atoms/title";
import Line from "../atoms/line";
import { useInViewport } from "react-in-viewport";

export default function Services(props) {
  const myRef = useRef();
  const { inViewport } = useInViewport(myRef, {}, { disconnectOnLeave: false });

  return (
    <div>
      <Title title={"Mes \n services"} />
      <div className="flex justify-between">
        <div className={inViewport ? "mt-6 transition transform translate-y-10 duration-1000 origin-center ease-in-out" : "opacity-0"}>
          <Line color={"blue"} />
          <h3 ref={myRef} className="uppercase tracking-widest">
            Front-End (React)
          </h3>
        </div>
        <div className={inViewport ? "mt-6 transition transform translate-y-10 duration-1000 origin-center ease-in-out delay-100" : "opacity-0"}>
          <Line color={"blue"} />
          <h3 className="uppercase tracking-widest">Back-End (Symfony)</h3>
        </div>
        <div className={inViewport ? "mt-6 transition transform translate-y-10 duration-1000 origin-center ease-in-out delay-200" : "opacity-0"}>
          <Line color={"blue"} />
          <h3 className="uppercase tracking-widest">Mobile (React Native)</h3>
        </div>
        <div className={inViewport ? "mt-6 transition transform translate-y-10 duration-1000 origin-center ease-in-out delay-300" : "opacity-0"}>
          <Line color={"blue"} />
          <h3 className="uppercase tracking-widest">Sites vitrine (Wix)</h3>
        </div>
      </div>
    </div>
  );
}
