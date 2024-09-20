import CustomConnectButton from "./connect-button";
import Link from "next/link";
import { LibraryBig } from "lucide-react";
import { DOCS_URL } from "@/constants/data";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="flex items-end justify-between py-6">
      <Link href={"/"}>
        <h2 className="font-sugar text-3xl font-bold transition ease-in-out hover:text-foreground/50">
          Jelly Beans
        </h2>
      </Link>
      <div className="flex items-center gap-x-2">
        <NavItem href={DOCS_URL}>
          <LibraryBig className="h-4 w-4" />
          <span className="ml-2 hidden md:flex">Resources</span>
        </NavItem>
        <CustomConnectButton />
      </div>
    </header>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "h-9 px-4 py-2",
      )}
    >
      {children}
    </a>
  );
}
