"use client";

import { Loader } from "lucide-react";

/**
 * DISCLAIMER:
 *
 * This file is not intended to be used as a default ssr fallback page
 * for loading.
 */

export default function LoadingPage() {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    </>
  );
}
