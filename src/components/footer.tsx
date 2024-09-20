// import Link from "next/link";

import { LICENSE_URL } from "@/constants/data";
import { Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="grid grid-cols-4 pb-12 pt-24">
      <div className="col-span-2 *:text-xs">
        <a
          href={LICENSE_URL}
          target="_blank"
          className="flex w-fit items-center gap-x-1.5 hover:underline"
        >
          <Scale className="h-4 w-4" />
          <span>MIT License</span>
        </a>
      </div>
    </footer>
  );
}
