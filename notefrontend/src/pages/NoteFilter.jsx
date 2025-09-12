// import React, { useEffect, useState } from "react";
// import NoteCard from "../components/NoteCard";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const NoteFilter = () => {
//     const {slug} = useParams
//   const [note, setnote] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/notes/search/${slug}`)
//       .then((res) => setnote(res.data))
//       .catch((err) => console.error(err));
//   }, []);
//   return (
//     <section className="flex flex-wrap mt-4 mb-4 items-center justify-center gap-6">
//       {note.map((note) => (
//         <NoteCard key={note.id} notes={note} />
//       ))}
//     </section>
//   );
// };

// export default NoteFilter;
