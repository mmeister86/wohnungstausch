'use client'

import WohnungstauschFormular from "@/components/wohnungen/wohnungs-formular";
import WohnungsFormularTipps from "@/components/wohnungen/wohnungs-formular-tipps";
import React, { useState } from "react";

const CreatePage = () => {
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <div className="container flex mx-auto py-8 gap-4">
      <WohnungstauschFormular
        className="w-3/4"
        onFieldFocus={setActiveField}
      />
      <aside className="w-1/4 relative hidden md:block">
        <WohnungsFormularTipps
          className="sticky"
          activeField={activeField}
        />
      </aside>
    </div>
  );
};

export default CreatePage;
