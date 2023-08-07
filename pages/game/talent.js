import { useEffect } from "react";
import { getTalent } from "../../redux/apiReq/index";
import Navbar from "../../src/components/navbar";
// import styles from "./talent.module.css";
import { useDispatch, useSelector } from "react-redux";

const Talent = () => {
  const talent = useSelector((state) => state?.talent?.talents?.talent);
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
  const handleFetchData = () => {
    getTalent(talent, dispatch);
  };

  useEffect(() => {
    handleFetchData();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="dice">
        <div className="side one">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="dot"></div>
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
