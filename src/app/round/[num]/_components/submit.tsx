"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Submit() {
  return (
    <form className="flex gap-x-2 font-bold text-md">
      <Input placeholder="Enter a number" />
      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </form>
  );
}
