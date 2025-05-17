import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse p-6 max-w-4xl mx-auto">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-2xl w-1/3 mb-5"></div>

      {/* Paragraph Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl w-2/3"></div>
      </div>

      {/* Code Block Skeleton */}
      <div className="mt-6 h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
    </div>
  );
};

export default SkeletonLoader;
