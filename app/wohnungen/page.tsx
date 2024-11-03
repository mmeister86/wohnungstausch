import WohnungsGrid from "@/components/wohnungen/wohnungs-grid";
import Suche from "@/components/wohnungen/wohnungs-suche";
import React from "react";

const page = () => {
  return (
    <>
      <Suche />
      <WohnungsGrid />
    </>
  );
};

export default page;
