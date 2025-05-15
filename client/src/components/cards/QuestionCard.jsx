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
    <>
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text[15px] font-semibold text-gray-400 leading-[18px]">
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
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap  border border-indigo-50 hover:border-indigo-200 cursor-pointer"
              onClick={onTogglePin}
            >
              {isPinned ? (
                <LuPinOff className="text-xs " />
              ) : (
                <LuPin className="text-xs" />
              )}
            </button>
            <button
              className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 oy-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer "
              onClick={() => {
                setIsExpanded(true);
                openLeanMore();
              }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>
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
    </>
  );
};

export default QuestionCard;












// import { useEffect, useRef, useState } from "react";
// import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";

// const QuestionCard = ({
//   question,
//   answer, // Make sure to destructure the answer prop
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
//       setHeight(contentHeight + 10);
//     } else {
//       setHeight(0);
//     }
//   }, [isExpanded]);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between cursor-pointer">
//         <div className="flex items-start gap-3.5">
//           <span className="text-xs md:text[15px] font-semibold text-gray-400 leading-[18px]">
//             Q
//           </span>
//           <h3
//             className="text-xs md:text-[15px] font-medium text-gray-800 mr-0 md:mr-20"
//             onClick={toggleExpand}
//           >
//             {question}
//           </h3>
//         </div>
//         <div className="flex items-center justify-end ml-4 relative">
//           <div
//             className={`flex ${
//               isExpanded ? "md:flex" : "md:hidden group-hover:flex"
//             }`}
//           >
//             <button
//               className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer"
//               onClick={onTogglePin}
//             >
//               {isPinned ? (
//                 <LuPinOff className="text-xs" />
//               ) : (
//                 <LuPin className="text-xs" />
//               )}
//             </button>
//             <button
//               className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer"
//               onClick={() => {
//                 setIsExpanded(true);
//                 openLeanMore();
//               }}
//             >
//               <LuSparkles />
//               <span className="hidden md:block">Learn More</span>
//             </button>
//           </div>
//           <button
//             className="text-gray-400 hover:text-gray-500 cursor-pointer"
//             onClick={toggleExpand}
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
//       <div
//         className="overflow-hidden transition-all duration-300 ease-in-out"
//         style={{ maxHeight: `${height}px` }}
//       >
//         <div
//           ref={contentRef}
//           className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
//         >
//           {answer} {/* Actually display the answer prop here */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default QuestionCard;