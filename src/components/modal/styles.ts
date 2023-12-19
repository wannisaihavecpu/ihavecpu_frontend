import styled, { keyframes } from "styled-components";

export const TableDIYStyle = styled.div`
  max-width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  @media screen and (max-width: 900px) {
    max-height: 500px;
  }
  .main {
    padding: 1em;
    padding-bottom: 1.1em;
    border-radius: 15px;
    margin: 1em;
  }

  .loader {
    margin-bottom: 0.5rem;
    border: 1px solid #e1e1e1;
    display: flex;
    flex-direction: row;
    height: 6em;
    padding-left: 1em;
    padding-right: 1em;
    transform: rotate(180deg);
    justify-content: right;
    border-radius: 10px;
    transition: 0.3s ease-in-out;
  }

  .loader:hover {
    cursor: pointer;
    background-color: lightgray;
  }

  .currentplaying {
    display: flex;
    margin: 1em;
  }
  .name {
    color: #13111acc;
    font-size: 14px;
    font-weight: 800;
  }

  .spotify {
    width: 50px;
    height: 50px;
    margin-right: 0.6em;
  }

  .heading {
    color: black;
    font-size: 1.1em;
    font-weight: bold;
    align-self: center;
  }

  .loading {
    display: flex;
    margin-top: 1em;
    margin-left: 0.3em;
  }

  .load {
    width: 2px;
    height: 33px;
    background-color: limegreen;
    animation: 1s move6 infinite;
    border-radius: 5px;
    margin: 0.1em;
  }

  .load:nth-child(1) {
    animation-delay: 0.2s;
  }

  .load:nth-child(2) {
    animation-delay: 0.4s;
  }

  .load:nth-child(3) {
    animation-delay: 0.6s;
  }

  .play {
    position: relative;
    left: 0.35em;
    height: 1.6em;
    width: 1.6em;
    clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
    background-color: black;
    transform: rotate(-90deg);
    align-self: center;
    margin-top: 0.7em;
    justify-self: center;
  }

  .albumcover {
    img {
      border-radius: 10px;
      height: 50px;
      width: 50px;
    }
    position: relative;
    margin-right: 1em;
    height: 50px;
    width: 50px;
    background-color: rgb(233, 232, 232);
    align-self: center;
    border-radius: 10px;
  }

  .song {
    position: relative;
    transform: rotate(180deg);
    margin-right: 1em;
    color: black;
    align-self: center;
  }

  .artist {
    font-size: 0.6em;
  }

  @keyframes move6 {
    0% {
      height: 0.2em;
    }

    25% {
      height: 0.7em;
    }

    50% {
      height: 1.5em;
    }

    100% {
      height: 0.2em;
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

export const ModalNavListDIY = styled.div`
  &.open {
    opacity: 1;
    transform: translateX(0);
    animation: ${fadeInFromLeft} 0.5s ease both;
  }
  &.exits {
    opacity: 1;
    transform: translateX(0);
    animation: ${fadeOutToLeft} 0.5s ease both;
  }
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s ease, transform 0.5s ease;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  // align-items: center;
  // justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;

  /* modal content */
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  .exit-button {
    position: absolute;
    top: 10px;
    right: 10px;

    padding: 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  .text-left {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Display selected products */
  .selected-products {
    overflow-y: auto;
    max-height: 80vh;
    padding: 20px 10px 85px;
    ::-webkit-scrollbar {
      border-radius: 8px;
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  }

  /* Buttons for creating specification and resetting */
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  /* Button styles */
  .button {
    /* Add styles for the buttons */
    cursor: pointer;
  }

  /* Prevent scrolling of body content when modal is open */
  body.modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
`;
