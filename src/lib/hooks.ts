"use client";

import { useEffect, useState } from "react";

export const useCountdown = (targetTimestamp: bigint) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const diff = targetTimestamp - now;
    return diff > BigInt(0) ? diff : BigInt(0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return { timeLeft, isPassed: timeLeft === BigInt(0) };
};

export const useCountdownPassed = (targetTimestamp: bigint) => {
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const checkIfPassed = () => {
      const now = BigInt(Math.floor(Date.now() / 1000));
      if (now >= targetTimestamp) {
        setIsPassed(true);
        clearInterval(interval);
      }
    };
    const interval = setInterval(checkIfPassed, 1000);
    checkIfPassed(); // Check immediately on mount
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return isPassed;
};
