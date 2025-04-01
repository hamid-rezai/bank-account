import { useSelector } from "react-redux";
import CountUp from "../../components/count-up";

function BalanceDisplay() {
  const { balance } = useSelector((store) => store.account);

  return (
    <div className='absolute top-[40px] rounded right-[40px] bg-[#f7f7f7] py-[24px] px-[32px] font-bold text-3xl min-w-[180px] text-center  '>
      <CountUp
        from={0}
        to={balance}
        separator=','
        direction='up'
        duration={1}
        className='count-up-text'
      />
    </div>
  );
}
export default BalanceDisplay;
