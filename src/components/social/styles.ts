import styled, { keyframes } from "styled-components";

export const SocialCircle = styled.div`
  .shareArticle {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    padding: 15px;
  }

  .shareSocial {
    display: flex;
    flex-flow: row;
    align-items: center;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      flex-flow: column;
    }
    .socialTitle {
      margin: 0 15px 0 0;
      font-size: 20px;
      @media (max-width: 767px) {
        margin-bottom: 15px;
        text-align: center;
      }
    }
    .socialList {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      justify-content: center;
      flex-flow: row wrap;
      li {
        margin: 5px;
        &:first-child {
          padding-left: 0;
        }
        a {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 100%;
          text-decoration: none;
          background-color: #999;
          color: #fff;
          transition: 0.35s;
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: top left;
            transform: scale(1) translate(-50%, -50%);
            transition: 0.35s;
          }
          &:hover {
            i {
              transform: scale(1.5) translate(-50%, -50%);
            }
          }
        }
        &:nth-child(1) a {
          background-color: #135cb6;
        }
        &:nth-child(2) a {
          background-color: #00b900;
        }
        // &:nth-child(3) a {
        //   background-color: #bd081c;
        // }
        // &:nth-child(4) a {
        //   background-color: #111111;
        // }
        // &:nth-child(5) a {
        //   background-color: #1fb381;
        // }
      }
    }
  }

  .shareLink {
    .permalink {
      position: relative;
      border-radius: 30px;
      .textLink {
        text-align: center;
        padding: 12px 60px 12px 30px;
        height: 45px;
        width: 450px;
        font-size: 16px;
        letter-spacing: 0.3px;
        color: #494949;
        border-radius: 25px;
        border: 1px solid #f2f2f2;
        background-color: #f2f2f2;
        outline: 0;
        appearance: none;
        transition: all 0.3s ease;
        @media (max-width: 767px) {
          width: 100%;
        }
        &:focus {
          border-color: #d8d8d8;
        }
        &::selection {
          color: #fff;
          background-color: #ff0a4b;
        }
      }
      .copyLink {
        position: absolute;
        top: 50%;
        right: 25px;
        cursor: pointer;
        transform: translateY(-50%);
        &:hover {
          &:after {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        &:after {
          content: attr(tooltip);
          width: 140px;
          bottom: -40px;
          left: 50%;
          padding: 5px;
          border-radius: 4px;
          font-size: 0.8rem;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          background-color: #000000;
          color: #ffffff;
          transform: translateY(-10px) translateX(-50%);
          transition: all 300ms ease;
          text-align: center;
        }
        i {
          font-size: 20px;
          color: #f2f2f2;
        }
      }
    }
  }
`;

const fadeInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const fadeOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;
