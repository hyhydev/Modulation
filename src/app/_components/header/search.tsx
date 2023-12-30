"use client";

import { Search } from "lucide-react";
import { useUIStore } from "~/stores/uiStore";
import { Button } from "~/ui/components/ui/button";

export function HeaderSearch() {
  const { fullWidthSearch, showFullWidthSearch } = useUIStore();

  return (
    <div
      className={`mr-2 flex-shrink-0 items-center md:gap-2 ${
        fullWidthSearch ? "hidden" : "flex"
      }`}
    >
      <Button
        onClick={() => showFullWidthSearch()}
        size="icon"
        variant="ghost"
        className="md:hidden"
      >
        <Search />
      </Button>
    </div>
  );
}
