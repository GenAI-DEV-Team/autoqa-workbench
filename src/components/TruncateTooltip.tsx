import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TruncateTooltipProps {
  text: string;
  lines?: 1 | 2;
  className?: string;
}

const TruncateTooltip = ({ text, lines = 1, className = "" }: TruncateTooltipProps) => {
  const clampClass = lines === 1 ? "truncate" : `line-clamp-${lines}`;
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`max-w-full ${clampClass} ${className}`} title={text}>
          {text}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-3xl whitespace-pre-wrap">
        {text}
      </TooltipContent>
    </Tooltip>
  );
};

export default TruncateTooltip;
