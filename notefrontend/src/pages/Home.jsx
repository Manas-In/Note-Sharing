import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import NoteCardCoantainer from "../components/NoteCardCoantainer";
import { Link } from "react-router-dom";
import Search from "../components/Search";
// import axios from "axios";
const Home = () => {
//   const [searchData, setsearchData] = useState("");
//   const [filterData, setfilterData] = useState("");
//   const [notes, setnotes] = useState([]);

//   // Function to receive data from child
//   const handleFilterData = (data) => {
//     setfilterData(data); 
//   };
//   const handleSearchData = (data) => {
//     setsearchData(data);
//   };
  
//   useEffect(() => {
//     axios
//     .get('http://127.0.0.1:8000/notes/')
//     .then(response => setnotes(response.data.reverse()) )
//     .catch(error => {
//         if (error.response){
//             console.error(error.response.data.details)
//         }else{
//             console.log(error.massage)
//         }
//     })
    
//   },[])
  
  

  return (
    // <>
    //   <div className="flex mt-5 mb-4  gap-7 flex-row justify-center">
    //     <Filter sendData={handleFilterData} notes={notes} />
    //     {/* Serach Menu */}

    //     <Search senddata={handleSearchData} />
    //   </div>

    //   <NoteCardCoantainer searchData={searchData } filterData = {filterData}  />
    // </>
    
    
     <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 mb-6">
          Welcome to NotesApp ✨
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Organize your thoughts, create notes, and access them anywhere.  
          A simple and secure note-taking application.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md transition"
          >
            Login
          </Link>
          <Link
            to="/registration"
            className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 shadow-sm transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} NotesApp. All rights reserved.
      </footer>
    </div>
    
    
  );
};

export default Home;
