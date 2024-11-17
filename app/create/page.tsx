'use client'

import WohnungstauschFormular from "@/components/wohnungen/wohnungs-formular";
import WohnungsFormularTipps from "@/components/wohnungen/wohnungs-formular-tipps";
import { WohnungsFormularSkeleton, WohnungsFormularTippsSkeleton } from "@/components/wohnungen/wohnungs-formular-skeleton";
import React, { useState, Suspense } from "react";

const CreatePage = () => {
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <div className="container flex mx-auto py-8 gap-4">
      <Suspense fallback={<WohnungsFormularSkeleton />}>
        <WohnungstauschFormular
          className="w-3/4"
          onFieldFocus={setActiveField}
        />
      </Suspense>
      <aside className="w-1/4 relative hidden md:block">
        <Suspense fallback={<WohnungsFormularTippsSkeleton />}>
          <WohnungsFormularTipps
            className="sticky"
            activeField={activeField}
          />
        </Suspense>
      </aside>
    </div>
  );
};

export default CreatePage;
