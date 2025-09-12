// import React, { useEffect, useMemo, useState } from "react";
// import NoteCard from "./NoteCard";
// import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Filter from "./Filter";
// import Search from "./Search";



// const NoteCardCoantainer = () => {
// //   const [notes, setnotes] = useState([]);
  
// const [searchData, setsearchData] = useState("");
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  

// //   useEffect(() => {
// //     axios
// //       .get("http://127.0.0.1:8000/notes/")
// //       .then((res) => {
// //         setnotes(res.data.reverse());
// //       })
// //       .catch((err) => {
// //         if (err.response) {
// //           setnotes(err.response.data);
// //         } else {
// //           setnotes([{ id: 0, title: "Error", body: err.message }]);
// //         }
// //       });
// //   }, [searchData]);
  
  
  

//   //   const filteredNotes = useMemo(() => {
//   //     let note = notes;
//   //     const searchDatas = (notes) =>
//   //       notes.title.toLowerCase().includes(searchData.toLowerCase()) ||
//   //       notes.body.toLowerCase().includes(searchData.toLowerCase()) ||
//   //       notes.catagory.toLowerCase().includes(searchData.toLowerCase());

//   //     if (filterData == "All") {
//   //       if (searchData) {
//   //         note = notes.filter(searchData);
//   //         return note;
//   //       }
//   //     return notes;
//   //     }

//   //     const filterDatas = (notes) =>
//   //       notes.catagory.toLowerCase().includes(filterData.toLowerCase());

//   //     if (filterDatas) {
//   //       note = notes.filter(filterDatas);
//   //     }
//   //     if (searchDatas) {
//   //       note = note.filter(searchDatas);
//   //     }

//   //     return note;
//   //   }, [notes, searchData, filterData]);

//   const filteredNotes = useMemo(() => {
//     let filtered = [...notes];

//     // Category filter
//     if (filterData !== "All") {
//       filtered = filtered.filter((note) =>
//         note.catagory.toLowerCase().includes(filterData.toLowerCase())
//       );
//     }

//     // Search filter (only if not empty)
//     if (searchData && searchData.trim() !== "") {
//       filtered = filtered.filter(
//         (note) =>
//           note.title.toLowerCase().includes(searchData.toLowerCase()) ||
//           note.body.toLowerCase().includes(searchData.toLowerCase()) ||
//           note.catagory.toLowerCase().includes(searchData.toLowerCase())
//       );
//     }

//     return filtered;
//   }, [notes, searchData, filterData]);

//   // const filteredNotes = useEffect(() => {
//   //     let filtered = [...notes];

//   //     // filter by category if not "All"
//   //     if (filterData !== "All") {
//   //       filtered = filtered.filter((note) =>
//   //         note.catagory.toLowerCase().includes(filterData.toLowerCase())
//   //       );
//   //     }

//   //     // filter by search if not empty
//   //     if (searchData && searchData.trim() !== "") {
//   //       filtered = filtered.filter(
//   //         (note) =>
//   //           note.title.toLowerCase().includes(searchData.toLowerCase()) ||
//   //           note.body.toLowerCase().includes(searchData.toLowerCase()) ||
//   //           note.catagory.toLowerCase().includes(searchData.toLowerCase())
//   //       );
//   //     }

//   //     return filtered;
//   //   }, [notes, searchData, filterData]);

//   return (
// <>
//   {/* Top Controls */}
//   <div className="flex flex-col sm:flex-row mt-6 mb-6 gap-5 items-center justify-center">
//     <Filter sendData={handleFilterData} notes={notes} />

//     {/* Search Menu */}
//     <Search senddata={handleSearchData} />
//   </div>

//   {/* Notes Section */}
//   <section className="flex flex-wrap mt-6 mb-8 items-center justify-center gap-8">
//     {filteredNotes.length > 0 ? (
//       filteredNotes.map((note) => <NoteCard key={note.id} notes={note} />)
//     ) : (
//       <p className="text-gray-500 text-lg font-medium italic">
//         No notes found ✨
//       </p>
//     )}
//   </section>
// </>

//   );
// };

// export default NoteCardCoantainer;



















import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
import NoteCard from "./NoteCard";
import Filter from "./Filter";
import Search from "./Search";
import axiosinstance from "../Axiosinstance";

const NoteCardContainer = () => {
  const [notes, setNotes] = useState([]);
  const [filterData, setFilterData] = useState("All");
  const [searchData, setSearchData] = useState("");

  // Child data handlers
  const handleFilterData = (data) => setFilterData(data);
  const handleSearchData = (data) => setSearchData(data);

  useEffect(() => {
    // const token = localStorage.getItem("accessTokon"); // from login
    axiosinstance
      .get("/notes/" 
    //     {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    )
      .then((res) => setNotes(res.data))
      .catch((err) =>
        console.error(err.response?.data?.detail || err.message)
      );
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Category filter
      const catMatch =
        filterData === "All" ||
        note.catagory.toLowerCase() === filterData.toLowerCase();
      // Search filter
      const searchMatch =
        !searchData ||
        note.title.toLowerCase().includes(searchData.toLowerCase()) ||
        note.body.toLowerCase().includes(searchData.toLowerCase()) ||
        note.catagory.toLowerCase().includes(searchData.toLowerCase());

      return catMatch && searchMatch;
    });
  }, [notes, filterData, searchData]);

  return (
    <>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row mt-6 mb-6 gap-5 items-center justify-center">
        <Filter sendData={handleFilterData} notes={notes} />
        <Search senddata={handleSearchData} />
      </div>

      {/* Notes Section */}
      <section className="flex flex-wrap mt-6 mb-8 items-center justify-center gap-8">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => <NoteCard key={note.id} notes={note} />)
        ) : (
          <p className="text-gray-500 text-lg font-medium italic">
            No notes found ✨
          </p>
        )}
      </section>
    </>
  );
};

export default NoteCardContainer;
