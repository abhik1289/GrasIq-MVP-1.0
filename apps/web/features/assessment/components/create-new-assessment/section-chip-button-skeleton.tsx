import { cn } from "@workspace/ui/lib/utils";

export default function SectionSkeleton() {
  return (
    <div
      className={cn(
        "border h-[30px] py-2 px-2 flex items-center justify-between w-[110px] rounded text-[14px] animate-pulse"
      )}
    >
      {/* Fake text */}
      <span className="h-3 w-14 bg-gray-300 rounded"></span>

      {/* Fake plus icon */}
      <div className="pl-2 ml-2 border-l border-white h-5 flex items-center">
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
