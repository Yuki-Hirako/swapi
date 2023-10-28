import React from "react";
import "./DarthVaderSaber.css";

const DarthVaderSaber = (props) => {
  const laserMax = 630;
  const percent = props.percent >= 1 ? 1 : props.percent;
  const glowStyle =
    percent >= 1 ? "laser-glow laser-glow-active" : "laser-glow";
  const width = percent * laserMax;
  const laserStyle = { width: `${width}px` };
  const laserClass = percent >= 1 ? "laser laser-active" : "laser";

  return (
    <div className="saber darth-vader-saber">
      <div className="handle">
        <div className="tip"></div>
        <div className="grip grip1"></div>
        <div className="grip grip2"></div>
        <div className="grip grip3"></div>
        <div className="center"></div>
        <div className="center-bottom">
          <div className="screw"></div>
        </div>
        <div className="cables">
          <div className="hole hole1"></div>
          <div className="hole hole2"></div>
          <div className="cable cable1"></div>
          <div className="cable cable2"></div>
        </div>
        <div className="shadow"></div>
        <div className={laserClass} style={laserStyle}>
          <div className={glowStyle}></div>
          <div className="laser-tip">
            <div className={glowStyle}></div>
          </div>
        </div>
        <div className="guard-tip"></div>
        <div className="guard-rectangle">
          <div className="shadow"></div>
        </div>
        <div className="guard-triangle"></div>
        <div className="guard-triangle-shadow"></div>
      </div>
    </div>
  );
};

export default DarthVaderSaber;
