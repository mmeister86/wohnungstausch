'use client'

import WohnungstauschFormular from "@/components/wohnungen/wohnungs-formular";
import WohnungsFormularTipps from "@/components/wohnungen/wohnungs-formular-tipps";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirectTo=/create');
    }
  }, [user, loading, router]);

  if (!user && !loading) {
    return null;
  }

  return (
    <div className="container flex mx-auto py-8 gap-4">
      <div className="w-3/4">
        <WohnungstauschFormular
          onFieldFocus={setActiveField}
        />
      </div>
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
