import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse p-4 max-w-4xl mx-auto">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      
      {/* Paragraph Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      </div>

      {/* Code block Skeleton */}
      <div className="mt-6 h-40 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
    </div>
  )
}

export default SkeletonLoader
