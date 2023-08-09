import { useEffect } from "react";
import { getTalent, getHistoryTailent ,betTalent } from "../../redux/apiReq/index";
import Navbar from "../../src/components/navbar";
import { useDispatch, useSelector } from "react-redux";

const Talent = () => {
  const talent = useSelector((state) => state?.talent?.talents?.talent);
  const history = useSelector((state) => state?.talent?.history?.data || []);
  const dispatch = useDispatch();

  const reversedHistory = [...history].reverse();
  const sideUi = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "onsixe" },
  ];

  const handleFetchData = (getDataFunc) => {
    getDataFunc(dispatch);
  };

  useEffect(() => {
    const talentInterval = setInterval(() => {
      handleFetchData(getTalent);
    }, 60 * 1000);

    const historyInterval = setInterval(() => {
      handleFetchData(getHistoryTailent);
    }, 60 * 1000);

    return () => {
      clearInterval(talentInterval);
      clearInterval(historyInterval);
    };
  }, [dispatch]);

  const handleBetTalent = () => {
    const postData = {
      userId:"64d1fe7f3396d08bef7b5857",
      bet:true,
      coin:2000
    };
    betTalent(postData, dispatch);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="text-center flex justify-center mb-4">
          <p className="font-semibold text-4xl">{talent?.total}</p>
          <p className="font-semibold text-4xl">
            {talent?.result === true ? "Tài" : "Xỉu"}
          </p>
        </div>
        <div className="flex justify-center">
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

        <div className="flex justify-center mt-4">
          {reversedHistory.map((item, index) => {
            return (
              <div className="history" key={index}>
                <p className={item?.result === true ? "tai" : "xiu"}>
                  {item?.result === true ? "Tài" : "Xỉu"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handleBetTalent}>Gửi POST Request</button>

    </>
  );
};

export default Talent;
