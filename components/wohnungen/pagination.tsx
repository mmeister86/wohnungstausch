'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-6 pb-6">
      <Button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
      >
        Zurück
      </Button>

      <span className="py-2 px-4">
        Seite {currentPage} von {totalPages}
      </span>

      <Button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
      >
        Weiter
      </Button>
    </div>
  );
}
