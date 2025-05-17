








import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  openLeanMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
          </span>
          <h3
            className="text-xs md:text-[15px] font-medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 relative">
          {/* Hover buttons */}
          <div
            className={`absolute -top-1 right-7 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
          >
            <button
              className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer"
              onClick={onTogglePin}
            >
              {isPinned ? <LuPinOff /> : <LuPin />}
            </button>
            <button
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer"
              onClick={() => {
                setIsExpanded(true);
                openLeanMore();
              }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          {/* Expand/Collapse Icon */}
          <button
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Answer Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;


// import { useEffect, useRef, useState } from "react";
// import {
//   LuChevronDown,
//   LuPin,
//   LuPinOff,
//   LuSparkles,
// } from "react-icons/lu";
// import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

// const QuestionCard = ({
//   question,
//   answer,
//   openLeanMore,
//   isPinned,
//   onTogglePin,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [height, setHeight] = useState(0);
//   const contentRef = useRef(null);

//   useEffect(() => {
//     if (isExpanded) {
//       const contentHeight = contentRef.current.scrollHeight;
//       setHeight(contentHeight + 12);
//     } else {
//       setHeight(0);
//     }
//   }, [isExpanded]);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="group p-5 bg-white rounded-xl shadow-md border border-gray-200 transition-shadow hover:shadow-lg">
//       <div className="flex items-start justify-between cursor-pointer gap-4">
//         {/* Left: Q + Question */}
//         <div className="flex items-start gap-3">
//           <span className="text-sm font-semibold text-indigo-500">Q</span>
//           <h3
//             className="text-sm md:text-base font-medium text-gray-800 leading-snug"
//             onClick={toggleExpand}
//           >
//             {question}
//           </h3>
//         </div>

//         {/* Right: Buttons + Chevron */}
//         <div className="flex items-center gap-2 relative">
//        <div className="absolute -top-1 right-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//   <button
//     onClick={onTogglePin}
//     className="flex items-center gap-1 text-[11px] text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-200 hover:bg-indigo-200"
//   >
//     {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
//   </button>
//   <button
//     onClick={() => {
//       setIsExpanded(true);
//       openLeanMore();
//     }}
//     className="flex items-center gap-1 text-[11px] text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-full border border-cyan-200 hover:bg-cyan-200"
//   >
//     <LuSparkles size={14} />
//     <span className="hidden md:inline">Learn More</span>
//   </button>
// </div>

//           <button
//             onClick={toggleExpand}
//             className="text-gray-400 hover:text-gray-600 transition"
//           >
//             <LuChevronDown
//               size={20}
//               className={`transform transition-transform duration-300 ${
//                 isExpanded ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Expandable content */}
//       <div
//         className="overflow-hidden transition-all duration-300 ease-in-out"
//         style={{ maxHeight: `${height}px` }}
//       >
//         <div
//           ref={contentRef}
//           className="mt-4 text-sm text-gray-700 bg-gray-50 px-5 py-4 rounded-lg"
//         >
//           <AIResponsePreview content={answer} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;
