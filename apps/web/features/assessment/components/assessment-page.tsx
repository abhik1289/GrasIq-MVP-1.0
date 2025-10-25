"use client";

import { Button } from "@workspace/ui/components/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function AssessmentPage() {
  const router = useRouter();
  return (
    <div className="main_wrapper px-4 mt-2">
      <div className="header flex justify-end">
        <a href="/assessment-builder" target="_blank" rel="noopener noreferrer">
          <Button>
            <span>
              <FileText />
            </span>
            Add
          </Button>
        </a>
      </div>
    </div>
  );
}

export default AssessmentPage;
