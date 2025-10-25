import React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
function ToolbarButton({ item }: { item: any }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          variant="outline"
          key={item.id}
          className="flex items-center gap-2 "
        >
          {item.icon && <item.icon size={18} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default ToolbarButton;
