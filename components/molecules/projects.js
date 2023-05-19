import React from "react";
import Title from "../atoms/title";
import Line from "../atoms/line";

export default function Projects() {
  return (
    <div>
      <Line color={"blue"} />
      <Title title={"Mes \n projets"} />
      <p className="mt-8 font-light max-w-md">
        Sont présentés ci-dessous les projets réalisés par Jinbei Studio que ce soit des sites web, des applications web, ou encore des applications
        mobiles.
      </p>
    </div>
  );
}
