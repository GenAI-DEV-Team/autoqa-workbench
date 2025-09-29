import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TruncateTooltip from "./TruncateTooltip";

interface ExpandOnClickProps {
  preview: string;
  full: string;
  lines?: 1 | 2;
}

const ExpandOnClick = ({ preview, full, lines = 2 }: ExpandOnClickProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-left w-full hover:bg-muted/50 rounded px-1 -mx-1 transition-colors">
          <TruncateTooltip text={preview} lines={lines} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-3xl whitespace-pre-wrap text-sm">
        {full}
      </PopoverContent>
    </Popover>
  );
};

export default ExpandOnClick;
