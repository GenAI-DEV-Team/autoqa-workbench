import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface LabelChipsProps {
  labels?: string[];
  max?: number;
}

const LabelChips = ({ labels = [], max = 2 }: LabelChipsProps) => {
  const shown = labels.slice(0, max);
  const extra = labels.slice(max);
  
  return (
    <div className="flex gap-1 flex-wrap items-center">
      {shown.map((label) => (
        <Badge key={label} variant="secondary" className="text-xs">
          {label}
        </Badge>
      ))}
      {extra.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-muted transition-colors"
            >
              +{extra.length}
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="flex flex-wrap gap-1.5">
              {extra.map((label) => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default LabelChips;
