import { useEffect, useState } from "react";
import {
  getTalent,
  getHistoryTailent,
  betTalent,
  getHistoryBet,
} from "../../redux/apiReq/index";
import Navbar from "../../src/components/navbar";
import ChartHistoryBet from "../../src/components/chart/talent/index";
import { useDispatch, useSelector } from "react-redux";

const Talent = () => {
  const userId = useSelector(
    (state) => state?.auth?.login?.currentUser?.others?._id
  );

  const talent = useSelector((state) => state?.talent?.talents?.talent);
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [historyBet, setHistoryBet] = useState([]);

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

  const handleBetTalent = () => {
    const postData = {
      userId: userId,
      bet: true,
      coin: 2000,
    };
    betTalent(postData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await getHistoryTailent();
        const talentData = await getTalent(dispatch);
        const historyBet = await getHistoryBet(userId);
        setHistoryBet(historyBet);
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="talent-content">
        <div className="text-center flex justify-center mb-4">
          <p className="font-semibold text-4xl">{talent?.total}</p>
          <p className="font-semibold text-4xl">
            {/* {talent?.result === true ? "Tài" : "Xỉu"} */}
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
              <div
                className={`history ${item?.result === true ? "tai" : "xiu"}`}
                key={index}
              >
                <p className={item?.result === true ? "tai" : "xiu"}>
                  {/* {item?.total} */}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center btn-bet">
          <button onClick={handleBetTalent}>Chọn</button>
        </div>
      </div>
      <div className="w-full h-600">
        <ChartHistoryBet data={historyBet} />
      </div>
    </>
  );
};

export default Talent;
