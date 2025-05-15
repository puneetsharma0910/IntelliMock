// import React from "react";
// import { LuTrash2 } from "react-icons/lu";
// import { getInitials } from "../../pages/utils/helper";

// const SummaryCard = ({
//   colors,
//   role,
//   topicsToFocus,
//   experience,
//   questions,
//   description,
//   lastUpdated,
//   onSelect,
//   onDelete,
// }) => {
//   return (
//     <div
//       className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group  "
//       onClick={onSelect}
//     >
//       <div
//         style={{
//           background: colors.bgcolor,
//         }}
//         className="rounded-lg p-4 cursor-pointer relative"
//       >
//         <div className="flex items-start">
//           <div className="flex-shrink-0 w-12 bg-white rounded-md flex items-center justify-center mr-10">
//             <span className="text-lg font-semibold text-black">{getInitials(role)}</span>
//           </div>
//           {/* conatent conatiner */}
//           <div className="flex-grow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-[17px] font-medium ">{role}</h2>
//                 <p className="text-xs text-medium text-gray-600">
//                   {topicsToFocus}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button
//           className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py1 rounded text-nowrap border border-rose-100 hover:border-rose-200  cursor-pointer absolute top-0 right-0 "
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete();
//           }}
//         >
//           <LuTrash2/>
//         </button>
//       </div>
//       <div className="px-3 pb-3 ">
//         <div className="flex items-center gap-3 mt-4">
//           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
//             Experience : {experience} {experience == 1 ? "Years" : "Year"}
//           </div>
//           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">{questions} Questions</div>
//           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full" >last updated : {lastUpdated}</div>
//         </div>
//         {/* description */}
//         <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default SummaryCard;



import React from "react"
import { LuTrash2 } from "react-icons/lu"
import { getInitials } from "../../pages/utils/helper"

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer relative group"
    >
      {/* Header Section */}
      <div
        className="p-5 rounded-t-2xl"
        style={{
          background: colors.bgcolor,
        }}
      >
        <div className="flex items-start">
          {/* Avatar */}
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 shadow-md">
            <span className="text-lg font-bold text-gray-900">
              {getInitials(role)}
            </span>
          </div>

          {/* Role & Topics */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{role}</h2>
            <p className="text-xs text-gray-700">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="absolute top-3 right-3 hidden group-hover:flex items-center gap-1 text-xs text-rose-600 font-medium bg-rose-50 px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition"
        >
          <LuTrash2 className="text-sm" />
          Delete
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Stats */}
        <div className="flex flex-wrap gap-2 text-[11px] font-medium text-gray-700">
          <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300">
            {questions} Questions
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
          {description}
        </p>
      </div>
    </div>
  )
}

export default SummaryCard
