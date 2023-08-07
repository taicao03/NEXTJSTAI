import { useEffect } from "react";
import { getTalent, getHistoryTailent } from "../../redux/apiReq/index";
import Navbar from "../../src/components/navbar";
// import styles from "./talent.module.css";
import { useDispatch, useSelector } from "react-redux";

const Talent = () => {
  const talent = useSelector((state) => state?.talent?.talents?.talent);
  const history = useSelector((state) => state);

  console.log("2131", history);
  const sideUi = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "onsixe" },
  ];
  console.log(talent);
  const dispatch = useDispatch();

  const handleFetchData = (getDataFunc, talentData) => {
    getDataFunc(talentData, dispatch);
  };

  useEffect(() => {
    handleFetchData(getTalent, talent);
    handleFetchData(getHistoryTailent, history);
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="dice me-6">
          {sideUi.map((side) => (
            <div key={side.name} className={`side side-${side.name}`}>
              {Array.from({ length: talent?.diceOne }, (_, index) => (
                <div key={index} className="dot"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="dice me-6">
          {sideUi.map((side) => (
            <div key={side.name} className={`side side-${side.name}`}>
              {Array.from({ length: talent?.diceTwo }, (_, index) => (
                <div key={index} className="dot"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="dice me-6">
          {sideUi.map((side) => (
            <div key={side.name} className={`side side-${side.name}`}>
              {Array.from({ length: talent?.diceThree }, (_, index) => (
                <div key={index} className="dot"></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center lg:flex lg:items-center">
        <p>{talent?.total}</p>
      </div>
    </>
  );
};

export default Talent;
