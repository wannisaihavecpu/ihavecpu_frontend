// components/CountdownTimer.js
import { useState, useEffect } from "react";
import styled from "styled-components";

const StylesFlashSaleBox = styled.div`
  .countdown-timer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .countdown-item {
    text-align: center;
    padding-left: 5px;
  }

  .countdown-box {
    background-color: white;
    padding: 5px;
    border: 2px solid #white;
    border-radius: 5px;
    width: 50px;
    height: 45px;
  }

  .countdown-item span {
    display: block;
    color: black;
    font-size: 10px;
  }

  .countdown-item span:first-child {
    font-size: 15px;
    font-weight: bold;
  }
`;

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now: Date = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <StylesFlashSaleBox>
      <div className="countdown-timer">
        <div className="countdown-item">
          <div className="countdown-box">
            <span>{timeLeft.days}</span>
            <span>วัน</span>
          </div>
        </div>
        <div className="countdown-item">
          <div className="countdown-box">
            <span>{timeLeft.hours}</span>
            <span>ชั่วโมง</span>
          </div>
        </div>
        <div className="countdown-item">
          <div className="countdown-box">
            <span>{timeLeft.minutes}</span>
            <span>นาที</span>
          </div>
        </div>
        <div className="countdown-item">
          <div className="countdown-box">
            <span>{timeLeft.seconds}</span>
            <span>วินาที</span>
          </div>
        </div>
      </div>
    </StylesFlashSaleBox>
  );
};

export default CountdownTimer;
