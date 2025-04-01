import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

const AccountOperations = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("AUD");

  const dispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
  } = useSelector((store) => store.account);

  const handleDeposit = () => {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("");
  };

  const handleWithdrawal = () => {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  };

  const handleRequestLoan = () => {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  };

  const handlePayLoan = () => {
    dispatch(payLoan());
  };
  return (
    <motion.div
      className='w-full max-w-3xl bg-[#f7f7f7] shadow-lg rounded-lg p-8 my-4'
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}>
      <h2 className='text-2xl text-gray-800 mb-6'>Your account operations</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col '>
          <label className='text-gray-700'>Deposit</label>
          <input
            className='mt-1 p-2 border w-full border-gray-300 -translate-x-2 rounded'
            type='number'
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            className='mt-2 p-2 border w-full -translate-x-2 border-gray-300 rounded'
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            <option value='AUD'>AU Dollar</option>
            <option value='USD'>US Dollar</option>
            <option value='GBP'>British Pound</option>
          </select>

          <motion.button
            className='mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeposit}
            disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </motion.button>
        </div>

        <div className='flex flex-col'>
          <label className='text-gray-700 block'>Withdraw</label>
          <input
            className='mt-1 p-2 border w-full border-gray-300 -translate-x-2 rounded'
            type='number'
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <motion.button
            className='mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </motion.button>
        </div>

        <div className='flex flex-col'>
          <label className='text-gray-700'>Request loan</label>
          <input
            type='number'
            value={loanAmount}
            className='mt-1 p-2 border w-full border-gray-300 rounded -translate-x-2'
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder='Loan amount'
          />
          <input
            className='mt-2 p-2 -translate-x-2 w-full border border-gray-300 rounded'
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder='Loan purpose'
          />
          <motion.button
            className='mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600'
            onClick={handleRequestLoan}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Request loan
          </motion.button>
        </div>
        {currentLoan > 0 && (
          <div className='flex flex-col items-center justify-center'>
            <span className='text-gray-700 mb-2'>
              Pay back ${currentLoan}({currentLoanPurpose})
            </span>
            <motion.button
              className='bg-yellow-500 text-white py-2 px-8 rounded hover:bg-yellow-600'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePayLoan}>
              Pay loan
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default AccountOperations;
