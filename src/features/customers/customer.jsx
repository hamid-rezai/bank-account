import { useSelector } from "react-redux";
import {motion} from "framer-motion";

const Customer=()=> {

  const customer = useSelector((store)=>
    store.customer.fullName
  )
  console.log(customer)
  return <motion.h2 className="text-3xl text-white my-4"
  initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
  >👋 Welcome, {customer}</motion.h2>;
}

export default Customer;
