export function QuestionSkeleton() {
  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-sm animate-pulse mt-1">
      {/* Question text skeleton */}
      <div className="h-5 w-3/4 rounded bg-gray-200 mb-4"></div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center space-x-2 rounded-lg border bg-gray-100 p-3"
          >
            {/* Radio circle */}
            <div className="h-4 w-4 rounded-full border-2 border-gray-300 bg-gray-200"></div>
            {/* Option text */}
            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
