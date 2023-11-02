import flagImg from "../assets/flag.png";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Intro = () => {
  return (
    <div className="intro-wrapper">
      <div className="intro">
        <header>
          <Logo />
          <ul className="header-links">
            <li>
              <Link to="/sign-in"> Sign In </Link>
            </li>
          </ul>
        </header>
        <div className="intro-content">
          <h1>Yet Another Blog</h1>
          <p>
            If you just wanna chat or vent a little, you can freely say it here,
            just remember to be tolerant of other people.
          </p>
          <img src={flagImg}></img>
        </div>
      </div>
    </div>
  );
};

export default Intro;
