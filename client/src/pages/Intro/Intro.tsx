import "./Intro.css";
import card1 from "../../assets/Icon1.svg";
import card2 from "../../assets/Icon2.svg";
import card3 from "../../assets/Icon3.svg";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <h1>Welcome to Mesh AI</h1>
      <div className="intro__cards">
        <div className="intro__card">
          <img src={card1} alt="" />
          <p>Bring all your documents into one secure AI workspace</p>
        </div>
        <div className="intro__card">
          <img src={card2} alt="" />
          <p>Organize and manage the documents that power your AI</p>
        </div>
        <div className="intro__card">
          <img src={card3} alt="" />
          <p>Your knowledge base, accessible through a simple chat interface</p>
        </div>
      </div>
      <p>Start by creating your Organization's Knowledge Base</p>
      <button onClick={() => navigate("/knowledge")}>Start</button>
    </div>
  );
}
