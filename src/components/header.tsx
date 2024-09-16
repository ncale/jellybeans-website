import { Button } from "./ui/button";
import CustomConnectButton from "./connect-button";

export default function Header() {
  return (
    <header className="flex justify-between items-center max-w-screen-lg mx-auto">
      <h2 className="font-bold text-2xl">Jelly beans</h2>
      <div className="gap-x-2 flex items-center">
        <Button variant="outline">Resources</Button>
        <Button variant="outline">Names</Button>
        <CustomConnectButton />
      </div>
    </header>
  );
}
