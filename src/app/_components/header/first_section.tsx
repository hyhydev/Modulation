"use client";

import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "~/stores/uiStore";

export function HeaderFirstSection() {
  const { fullWidthSearch } = useUIStore();

  return (
    <div
      className={`flex-shrink-0 items-center gap-4 ${
        fullWidthSearch ? "hidden" : "flex"
      }`}
    >
      <Link className="flex items-center gap-4" href="/">
        <Image
          src={`/logo.png`}
          alt="Modulation Logo"
          width="48"
          height="48"
          priority
        />
        {/* <Image
          src="/logo.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "20%", height: "auto" }}
          alt="Modulation Logo"
        /> */}
        <h1 className="text-xl font-bold tracking-tight">Modulation</h1>
      </Link>
    </div>
  );
}
