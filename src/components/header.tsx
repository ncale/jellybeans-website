import { Button } from "./ui/button";
import CustomConnectButton from "./connect-button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link href={"/"}>
        <h2 className="font-bold text-2xl">Jelly beans</h2>
      </Link>
      <div className="gap-x-2 flex items-center">
        <Button variant="outline">Resources</Button>
        <Button variant="outline">Names</Button>
        <CustomConnectButton />
      </div>
    </header>
  );
}
