// import React, { useState } from "react";
// import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";
// const categories = ["IMPORTANT", "BUSINESS", "PERSONAL"];

// const CreateNote = () => {
//     const navigate = useNavigate()
//   const [noteName, setNoteName] = useState("");
//   const [noteContent, setNoteContent] = useState("");
//   const [open, setOpen] = useState(false);
//   const [catagory, setcatagory] = useState(categories[0]);
  
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const newNote = {
//       title: noteName,
//       description: noteContent,
//       catagory: catagory
//     };
//     console.log("Note Submitted:", newNote);
//   try {
//     const response  = await axios.post("http://127.0.0.1:8000/notes/", {
//       title: noteName,
//       body: noteContent,
//       catagory: catagory
//     });
    
//   }catch(err){
//     console.log("Error is " , err.response.data);
    
//   }
    
//     setNoteName("");
//     setNoteContent("");
//     navigate("/", { replace: true }); 

//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4">
//   <div className="bg-white text-gray-700 w-full max-w-lg mx-auto p-8 rounded-3xl shadow-xl transition transform hover:shadow-2xl hover:-translate-y-1 duration-300">
//     <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600 tracking-wide">
//       📝 Create a Note
//     </h2>

//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Note Title */}
//       <div>
//         <label
//           htmlFor="note-name"
//           className="block text-sm font-medium text-gray-600 mb-2"
//         >
//           Note Title
//         </label>
//         <input
//           id="note-name"
//           value={noteName}
//           onChange={(e) => setNoteName(e.target.value)}
//           className="w-full bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 transition shadow-sm hover:shadow-md"
//           type="text"
//           placeholder="Enter note title"
//           required
//         />
//       </div>

//       {/* Note Content */}
//       <div>
//         <label
//           htmlFor="note-content"
//           className="block text-sm font-medium text-gray-600 mb-2"
//         >
//           Note Content
//         </label>
//         <textarea
//           id="note-content"
//           value={noteContent}
//           onChange={(e) => setNoteContent(e.target.value)}
//           className="w-full bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none rounded-xl py-3 px-4 text-gray-800 h-32 resize-none placeholder-gray-400 transition shadow-sm hover:shadow-md"
//           placeholder="Write something..."
//           required
//         />
//       </div>

//       {/* Category Dropdown */}
//       <div className="relative  justify-center inline-block text-left w-full">
//         <label className="flex justify-center text-sm font-medium mb-2 text-gray-600">
//           Category
//         </label>
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="w-full px-4 py-2 justify-center bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition flex  items-center"
//         >
//           <span>{catagory || "Select Category"}</span>
//           <svg
//             className="w-4 h-4 ml-2 transform transition-transform duration-200"
//             style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         {open && (
//           <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
//             {categories.map((cat, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 text-gray-700 flex justify-center ml-10 mr-10 rounded-3xl  hover:bg-indigo-600 hover:text-white cursor-pointer transition"
//                 onClick={() => {
//                   setOpen(false);
//                   setcatagory(cat);
//                 }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3 rounded-xl text-white font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition transform duration-200"
//       >
//         Save Note
//       </button>
//     </form>
//   </div>
// </div>

//   );
// };

// export default CreateNote;













import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../Axiosinstance";

const categories = ["IMPORTANT", "BUSINESS", "PERSONAL"];

const CreateNote = () => {
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("accessTokon");
    if (!token) {
      setError("You must be logged in to create a note.");
      return;
    }

    try {
      await axiosinstance.post(
        "http://127.0.0.1:8000/notes/",
        {
          title: noteTitle,
          body: noteContent,
          category: category,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      navigate("/"); // redirect to home or notes list
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to create note. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4">
      <div className="bg-white w-full max-w-lg mx-auto p-8 rounded-3xl shadow-xl transition hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          📝 Create Note
        </h2>

        {error && (
          <p className="text-red-600 font-medium bg-red-100 px-4 py-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              type="text"
              placeholder="Enter note title"
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Content</label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write something..."
              required
              className="w-full h-32 bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl flex justify-between px-4 shadow"
            >
              {category} <span>&#9662;</span>
            </button>

            {open && (
              <ul className="absolute mt-2 w-full bg-white border rounded-xl shadow-lg z-10">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className="px-4 py-2 hover:bg-indigo-600 hover:text-white cursor-pointer"
                    onClick={() => {
                      setCategory(cat);
                      setOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-purple-700"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;

