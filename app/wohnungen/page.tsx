import WohnungsGrid from "@/components/wohnungen/wohnungs-grid";
import Suche from "@/components/wohnungen/wohnungs-suche";
import React from "react";

const page = () => {
  return (
    <>
      <div className="bg-gray-50">
        <Suche />
        <WohnungsGrid />
      </div>
    </>
  );
};

export default page;
