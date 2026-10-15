import "./Intro.css";
import card1 from "../../assets/Card.svg";
import card2 from "../../assets/Card2.svg";
import card3 from "../../assets/Card3.svg";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <h1>Welcome to Mesh AI</h1>
      <div className="intro__cards">
        <div className="intro__card">
          <img src={card1} alt="Documents" />
        </div>
        <div className="intro__card">
          <img src={card2} alt="Documents" />
        </div>
        <div className="intro__card">
          <img src={card3} alt="Documents" />
        </div>
      </div>
      <p>Start by creating your Organization's Knowledge Base</p>
      <button onClick={() => navigate("/knowledge")}>Start</button>
    </div>
  );
}
