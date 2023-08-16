import { useEffect, useState } from "react";
import Notification, { notifySuccess, notifyError ,notifyWarning } from '../../src/components/notification/notification';
import {
  getTalent,
  getHistoryTailent,
  betTalent,
  getHistoryBet,
  getTotalBetRound
} from "../../redux/apiReq/index";
import 'animate.css';
import Navbar from "../../src/components/navbar";
import Modal from "../../src/components/chart/modal/modal-history-bet";
import ChartHistoryBet from "../../src/components/chart/talent/index";
import { useDispatch, useSelector } from "react-redux";
import numeral from 'numeral';


const Talent = () => {
  const userId = useSelector(
    (state) => state?.auth?.login?.currentUser?.others?._id
  );
  const talent = useSelector((state) => state?.talent?.talents?.talent);
  const dispatch = useDispatch();
  // useState
  const [history, setHistory] = useState([]);
  const [historyBet, setHistoryBet] = useState([]);
  const [totalBet, settotalBet] = useState(0);
  const [buttonBet, setButtonBet] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [buttonBetValue, setButtonBetValue] = useState(null);
  const reversedHistory = [...history].reverse();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Const render Ui
  const cointButton = [ 10000,50000,100000,500000,1000000,5000000];
  const valueButton = [
    {name:'tai',value:true},
    {name:'xiu',value:false},
  ]
  const sideUi = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
    { name: "onsixe" },
  ];
  const uiRenderDice = (
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
  );

  const messMammon = [
    'Mại zô! Mại zô!',
    'Hãy chọn xỉu tin tôi đi bạn êiii',
    'Chọn tài 5M luôn nè bro',
    'Xời , Tôi mà có tiền tôi ALLIN xỉu rồi á anh bạn',
    'Nạp thêm nhiều coin để chơi đuê!'
  ]

  const handleButtonClick = (number) => {
    setButtonBet(number);
  };

  const handleButtonValueBetClick = (value) => {
    setButtonBetValue(value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBetTalent = () => {
    const postData = {
      userId: userId,
      bet: buttonBetValue,
      coin: buttonBet,
    };

    betTalent(postData)
    .then(response => {
    if (response === undefined) {
      notifyWarning('Thiếu');
    } else {
      notifySuccess('Bạn đã cược thành công');
      handleReset()
    }      
    })
    .catch(error => {
       if (error && error.message) {
        notifyError(error.message);
      } else {
        notifyError('An error occurred.');
      }
    });

  };

  const handleReset = () => {
    setButtonBetValue('');
    setButtonBet('');
  };

  
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await getHistoryTailent();
        const talentData = await getTalent(dispatch);
        const historyBet = await getHistoryBet(userId);
        setHistoryBet(historyBet);
        setHistory(historyData);
        const randomIndex = Math.floor(Math.random() * messMammon.length);
        setCurrentMessage(messMammon[randomIndex]);
      } catch (error) {
        console.log(error)
        console.error("Error fetching history data:", error);
      }
    };
   
    fetchData();
    const interval = setInterval(fetchData, 10*  1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await getTotalBetRound();
        settotalBet(getData)
      } catch (error) {
        console.log(error)
        console.error("Error fetching history data:", error);
      }
    };
   
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);


  // Render giao dien
  return (
    <>
      <Notification />
      <Navbar />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        data={historyBet}
        />

      <div className="talent-content">
        <div className="img-gif-momom">
         <img src="https://danviet.mediacdn.vn/2021/2/16/than-tai4-16134742652421068908802.gif" alt="Animated GIF" />
          <div className="bubble">
            <p>
          {currentMessage}
            </p>
          </div>
        </div>
        <div className="img-gif-momom-2">
        <img src="https://danviet.mediacdn.vn/296231569849192448/2022/2/10/ngay-via-than-tai-2022-a-4-16444711407792053876352.gif" alt="Animated GIF" />
        </div>
        <p className="text-4xl text-center animate__heartBeat">
        {totalBet?.totalBothBetsAmount}
        </p>
        <div className="text-center flex justify-center mb-4">
          <p className={`font-semibold text-4xl mt-8 ${talent?.result === true ? 'text-black' :'text-white' }`}>{talent?.total}</p>
        </div>

        {talent ? uiRenderDice : ''}

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
        {buttonBetValue === true || buttonBetValue === false ? (
        <div className="bet-list">
        {cointButton.map((number, index) => (
                <button
                  key={index}
                  className={`btn-bet-talent ${number === buttonBet ? 'active' :''}`}
                  onClick={() => handleButtonClick(number)}
                  data-number={number}
                >
                {numeral(number).format('0a')}
                </button>
                  ))}
        </div>
      ) : (
        <></>
      )}

      
      <div className="bet-btn-value">
            {valueButton.map((data, index) => (
              <button
                key={index}
                className={`btn-bet-talent`}
                onClick={() => handleButtonValueBetClick(data?.value)}
                data-number={data?.value}
              >
                <p className={`text-bet-value ${data?.name} ${data?.value === buttonBetValue ? 'active' :''}`}>
                {data?.value === true ? 'Tài' : 'Xỉu'}
                </p>
              </button>
                ))}

      </div>
      <div className="flex justify-around">
      <p className={`text-2xl ${buttonBetValue  === true?'animate__heartBeat' :''}`}>{
      buttonBetValue  === true? numeral(buttonBet).format('0,0')  || 0 : 0 
        }</p>
      <p className={`text-2xl ${buttonBetValue  === false?'animate__heartBeat' :''}`}>{
       buttonBetValue  === false?numeral(buttonBet).format('0,0') || 0: 0 
        }</p>
      </div>
     
        <div className="flex justify-center">
          <button className="btn-bet" onClick={handleBetTalent}>Cược</button>
        </div>

        <button className="btn-bet-reset" onClick={handleReset}>Hủy</button>
      <div>
      <button className="btn-bet-reset" onClick={openModal}>DSDS</button>
      </div>


      </div>
      <div className="w-full h-600 hidden ">
        {/* <ChartHistoryBet data={historyBet} /> */}
      </div>
    </>
  );
};

export default Talent;