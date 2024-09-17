import { Button } from "./ui/button";
import CustomConnectButton from "./connect-button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href={"/"}>
        <h2 className="text-2xl font-bold">Jelly beans</h2>
      </Link>
      <div className="flex items-center gap-x-2">
        <Button variant="outline">Resources</Button>
        <Button variant="outline">Names</Button>
        <CustomConnectButton />
      </div>
    </header>
  );
}
