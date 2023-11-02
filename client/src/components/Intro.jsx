import flagImg from "../assets/flag.png";

const Intro = () => {
  return (
    <div className="intro-wrapper">
      <div className="intro">
        <header>
          <p className="manu-logo">
            <a href="/">
              Manu<span>blogs</span>
            </a>
          </p>
          <ul className="header-links">
            <li>
              <a>Sign In</a>
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
