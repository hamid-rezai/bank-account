import './App.css'

import CreateCustomer from './features/customers/createCustomer'
import Customer from './features/customers/customer'
import AccountOperations from './features/accounts/accountOperations'
import { useSelector } from 'react-redux'
import {motion} from 'framer-motion'
import BalanceDisplay from './features/accounts/BalanceDisplay'

function App() {

  const fullName = useSelector((state)=>state.customer.fullName);

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:1}}
    className='min-w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4'>
    
      {fullName === ""? (
        
        <CreateCustomer/>
      ):(
        <>
        <Customer/>
        <AccountOperations/>
        <BalanceDisplay/>
        </>
      )}
     
    </motion.div>
  )
}

export default App;
