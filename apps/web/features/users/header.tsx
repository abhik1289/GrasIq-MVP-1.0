import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";
import React from "react";

function CourseBranchHeader() {
  return (
    <div className="flex justify-end gap-2">
      <Button>
        <Plus />
        Add Branch
      </Button>
      <Button>
        <Plus />
        Add Course
      </Button>
    </div>
  );
}

export default CourseBranchHeader;
