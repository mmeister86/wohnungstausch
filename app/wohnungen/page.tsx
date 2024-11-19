import WohnungsGrid from "@/components/wohnungen/wohnungs-grid";
import Suche from "@/components/wohnungen/wohnungs-suche";
import React, { Suspense } from "react";

const WohnungenPage = () => {
  return (
    <div className="bg-gray-50">
      <Suspense>
        <Suche />
      </Suspense>
      <Suspense>
        <WohnungsGrid />
      </Suspense>
    </div>
  );
};

export default WohnungenPage;
