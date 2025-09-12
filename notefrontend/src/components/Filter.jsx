import React, {  useState } from "react";

const Filter = ({ notes, sendData }) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setselectedNote] = useState({catagory: "All"});

  const handleSelect = (note) => {
    setselectedNote(note);
    setIsOpen(false);
    sendData(note.catagory); // ✅ directly send selected category
  };

  return (
   <div className="flex flex-col w-full sm:w-72 text-sm mt-3 relative">
  {/* Button */}
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="group flex items-center justify-center gap-32 w-full text-left px-3 py-2 border rounded-lg bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none transition-all duration-200"
  >
    <div className="flex items-center gap-2"> 
      {selectedNote?.catagory || "Select Category"}
    </div>
    <svg
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        d="M9.92546 6L5.68538 1L1.44531 6"
        stroke="#6B7280"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.44564 11L5.68571 16L9.92578 11"
        stroke="#6B7280"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>

  {/* Dropdown list */}
  {isOpen && (
    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 py-2 animate-fadeIn max-h-60 overflow-y-auto">
      {/* ALL option */}
      <li
        className={`flex justify-center ml-8 mr-8 items-center px-4 py-2 mb-2 text-gray-700 font-medium cursor-pointer rounded-lg transition-all duration-200 ${
          "All" === selectedNote.catagory
            ? "bg-indigo-500 text-white"
            : "hover:bg-indigo-500 hover:text-white hover:shadow-md hover:scale-[1.02]"
        }`}
        onClick={() => handleSelect({ ...selectedNote, catagory: "All" })}
      >
        All
        {"All" === selectedNote.catagory && (
          <span className="ml-2 text-sm">✔</span>
        )}
      </li>

      {/* Dynamic categories */}
      {[...new Set(notes.map((note) => note.catagory))].map((category) => (
        <li
          key={category}
          className={`flex  ml-8 mr-8  justify-center items-center px-4 mb-2 py-2 text-gray-700 font-medium cursor-pointer rounded-lg transition-all duration-200 ${
            category === selectedNote.catagory
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-500 hover:text-white hover:shadow-md hover:scale-[1.02]"
          }`}
          onClick={() =>
            handleSelect({ ...selectedNote, catagory: category })
          }
        >
          {category}
          {category === selectedNote.catagory && (
            <span className="ml-2 text-sm">✔</span>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Filter;




// import React, { useState } from "react";

// const Filter = ({ notes, sendData }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedNote, setSelectedNote] = useState({ category: "All" });

//   const handleSelect = (note) => {
//     setSelectedNote(note);
//     setIsOpen(false);
//     sendData(note.category); // send selected category
//   };

//   return (
//     <div className="flex flex-col w-64 text-sm mt-3 relative">
//       {/* Dropdown Button */}
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center justify-between w-full px-3 py-2 border rounded-xl 
//                    bg-white text-gray-700 border-gray-300 shadow-md 
//                    hover:bg-gray-50 focus:outline-none transition-all"
//       >
//         <span>{selectedNote?.category || "Select Category"}</span>
//         <svg
//           width="12"
//           height="12"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className={`transform transition-transform ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//         >
//           <path
//             d="M6 9L12 15L18 9"
//             stroke="#6B7280"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <ul
//           className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl 
//                      shadow-lg overflow-hidden z-10 animate-fadeIn"
//         >
//           {/* All option */}
//           <li
//             className={`px-3 py-2 cursor-pointer text-center transition-all ${
//               selectedNote.category === "All"
//                 ? "bg-indigo-500 text-white"
//                 : "hover:bg-indigo-100"
//             }`}
//             onClick={() => handleSelect({ category: "All" })}
//           >
//             All
//           </li>

//           {/* Dynamic categories */}
//           {[...new Set(notes.map((note) => note.category))].map((category) => (
//             <li
//               key={category}
//               className={`px-3 py-2 cursor-pointer text-center transition-all ${
//                 category === selectedNote.category
//                   ? "bg-indigo-500 text-white"
//                   : "hover:bg-indigo-100"
//               }`}
//               onClick={() => handleSelect({ category })}
//             >
//               {category}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Filter;
