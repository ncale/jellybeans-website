"use client";

export default function Details() {
  return (
    <div className="space-y-2">
      <div className="flex">
        <div className="min-w-32">
          <h4 className="text-sm text-muted-foreground">Pot</h4>
          <p className="text-xl font-semibold">2000</p>
        </div>
        <div className="">
          <h4 className="text-sm text-muted-foreground">
            Round submissions end in
          </h4>
          <p className="text-xl font-semibold">1d 3h</p>
        </div>
      </div>
      <p className="text-xl font-semibold">Without going over...</p>
    </div>
  );
}
