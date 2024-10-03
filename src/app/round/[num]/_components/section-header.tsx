import InfoPopover from "@/components/info-popover";
import { cn } from "@/lib/utils";

export default function SectionHeader({
  text,
  infoText,
  light = false,
}: {
  text: string;
  infoText?: string;
  light?: boolean;
}) {
  return (
    <h4
      className={cn(
        "flex items-center gap-x-1 text-sm font-medium",
        light ? "text-muted-foreground" : "",
      )}
    >
      <span className="block">{text}</span>
      {infoText && <InfoPopover text={infoText} />}
    </h4>
  );
}
