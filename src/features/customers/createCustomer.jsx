import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";
import {motion} from "framer-motion";

const CreateCustomer=()=> {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    if(!fullName || !nationalId) return;
    dispatch(createCustomer(fullName , nationalId));
  }

  return (
    <motion.div 
    initial={{y:50,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.8}}
    className="flex flex-col items-center justify-center w-full p-4">
      <motion.h2 initial={{scale:0.8}} animate={{scale:1}} transition={{duration:0.5}} className="text-2xl text-slate-100 mb-4">Create new customer</motion.h2>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{delay:0.2,duration:0.8}} className="bg-[#f7f7f7] shadow-md rounded-lg p-8 w-full max-w-md ">
        <div className="mb-4 ">
          <label className="block text-gray-700">Customer full name :</label>
          <input
          className="mt-2 block w-full p-2 border border-gray-600 rounded -translate-x-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">National ID :</label>
          <input
          className="mt-2 block w-full p-2 border border-gray-700 rounded -translate-x-2"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <motion.button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >Create New Customer
           </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default CreateCustomer;