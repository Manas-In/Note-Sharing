// import React, { useContext } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthProvider";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);
//   const { isLogin, setIsLogin } = useContext(AuthContext);
//   console.log(isLogin);
  
//   //   const { setIsLogin } = useContext(AuthContext);
//   const handleLogOut = () => {
//     localStorage.removeItem("accessTokon");
//     localStorage.removeItem("refreshTokon");
    
//     setIsLogin(false);
//     console.log("LOG Out");
//     console.log(isLogin)
//     navigate("/login");
//   };
//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
//       <a href="/">
//         <h1 className="text-shadow-black text-5xl ">Notes</h1>
//       </a>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center gap-8">
//         <Link to="/">Home</Link>

//         {/* Serach Menu  */}
//         {/* <form>
//           <div className="flex items-center border-b gap-2 border-gray-500/30 h-[46px] overflow-hidden max-w-md w-full">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="30"
//               height="30"
//               viewBox="0 0 30 30"
//               fill="#6B7280"
//             >
//               <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Find products"
              
//               className="w-full h-full outline-none placeholder-gray-500 text-gray-500 bg-transparent text-sm"
//             />
//             <button
//               type="submit"
//             //   onChange={(e) => setnote(e.target.value)}
//               className="bg-indigo-500 cursor-pointer w-32 h-9 rounded-full text-sm text-white"
//             >
//               Search
//             </button>
//           </div>
//         </form> */}

//         <Link
//           className="cursor-pointer px-8 py-2 bg-green-400 hover:bg-green-600 transition text-white rounded-2xl"
//           to="/create-note"
//         >
//           Create Notes
//         </Link>
//         {isLogin ? (
//           <button
//             onClick={handleLogOut}
//             className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
//           >
//             Log Out
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
//           >
//             Login
//           </Link>
//         )}
//       </div>

//       {/* Menu Icon SVG */}
//       <button
//         onClick={() => (open ? setOpen(false) : setOpen(true))}
//         aria-label="Menu"
//         className="sm:hidden"
//       >
//         <svg
//           width="21"
//           height="15"
//           viewBox="0 0 21 15"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect width="21" height="1.5" rx=".75" fill="#426287" />
//           <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
//           <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
//         </svg>
//       </button>

//       {/* Mobile Menu */}
//       <div
//         className={`${
//           open ? "flex" : "hidden"
//         } absolute top-[60px] left-0 w-full z-1 bg-white shadow-md py-4 flex-col items-start gap-4 px-5 text-sm md:hidden`}
//       >
//         {/* Home */}
//         <Link to="/" className="block w-full">
//           Home
//         </Link>

//         {/* Create Notes */}
//         <Link
//           to="/create-note"
//           className="cursor-pointer px-6 py-2 w-full text-center bg-green-400 hover:bg-green-600 transition text-white rounded-2xl text-sm"
//         >
//           Create Notes
//         </Link>

//         {/* Login */}
//         <Link
//           to="/login"
//           className="cursor-pointer px-6 py-2 w-full bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;















import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { IsLogin, setIsLogin } = useContext(AuthContext);

  const handleLogOut = () => {
    // ✅ fix token keys
    localStorage.removeItem("accessTokon");
    localStorage.removeItem("refreshTokon");
    setIsLogin(false);
    console.log("LOGGED OUT ✅");
    navigate("/login");
  };

  return (
  <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
                border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
  {/* Logo */}
  <Link to="/" className="text-indigo-600 font-bold tracking-tight">
    <h1 className="text-3xl md:text-4xl lg:text-5xl drop-shadow-sm">Notes</h1>
  </Link>

  {/* Desktop Menu */}
  <div className="hidden sm:flex items-center gap-8 font-medium text-gray-700">
    <Link
      to="/"
      className="hover:text-indigo-600 transition-colors duration-300"
    >
      Home
    </Link>

    <Link
      to="/create-note"
      className="px-6 py-2 bg-green-500 hover:bg-green-600 transition-colors 
                 text-white rounded-xl shadow-sm"
    >
      Create Notes
    </Link>

    {IsLogin ? (
      <button
        onClick={handleLogOut}
        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors 
                   text-white rounded-full shadow-sm"
      >
        Log Out
      </button>
    ) : (
      <Link
        to="/login"
        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors 
                   text-white rounded-full shadow-sm"
      >
        Login
      </Link>
    )}
  </div>

  {/* Mobile Menu Button */}
  <button
    onClick={() => setOpen(!open)}
    aria-label="Menu"
    className="sm:hidden focus:outline-none"
  >
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  {/* Mobile Dropdown */}
  <div
    className={`absolute top-[64px] left-0 w-full bg-white shadow-md border-t border-gray-200 
                flex-col items-start gap-4 px-6 py-6 text-gray-700 font-medium text-sm 
                transition-all duration-300 ease-in-out ${
                  open ? "flex opacity-100" : "hidden opacity-0"
                }`}
  >
    <Link to="/" className="block w-full hover:text-indigo-600">
      Home
    </Link>

    <Link
      to="/create-note"
      className="px-6 py-2 w-full text-center bg-green-500 hover:bg-green-600 
                 transition-colors text-white rounded-xl shadow-sm"
    >
      Create Notes
    </Link>

    {IsLogin ? (
      <button
        onClick={handleLogOut}
        className="px-6 py-2 w-full bg-indigo-500 hover:bg-indigo-600 
                   transition-colors text-white rounded-full shadow-sm"
      >
        Log Out
      </button>
    ) : (
      <Link
        to="/login"
        className="px-6 py-2 w-full bg-indigo-500 hover:bg-indigo-600 
                   transition-colors text-white rounded-full shadow-sm"
      >
        Login
      </Link>
    )}
  </div>
</nav>

  );
};

export default Navbar;
