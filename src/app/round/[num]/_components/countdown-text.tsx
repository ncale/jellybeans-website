import { useCountdown } from "@/lib/hooks";
import { formatSeconds } from "@/lib/utils";

export default function CountdownText({ timestamp }: { timestamp: bigint }) {
  const { timeLeft } = useCountdown(timestamp);
  const timeString = formatSeconds(timeLeft);
  return timeString === "0s" ? "Closed" : timeString;
}
