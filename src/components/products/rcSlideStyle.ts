import styled from "styled-components";

const StyledRcSlide = styled.div`
  .rc-slider {
    position: relative;
    width: 100%;
    height: 14px;
    padding: 5px 0;
    border-radius: 6px;
    touch-action: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #e9e9e9;
    border-radius: 6px;
  }
  .rc-slider-track,
  .rc-slider-tracks {
    position: absolute;
    height: 4px;
    background-color: #fbabab;
    border-radius: 6px;
  }
  .rc-slider-track-draggable {
    z-index: 1;
    box-sizing: content-box;
    background-clip: content-box;
    border-top: 5px solid rgba(0, 0, 0, 0);
    border-bottom: 5px solid rgba(0, 0, 0, 0);
    transform: translateY(-5px);
  }
  .rc-slider-handle {
    position: absolute;
    z-index: 1;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    background-color: #fff;
    border: solid 2px #fa9696;
    border-radius: 50%;
    cursor: pointer;
    cursor: -webkit-grab;
    cursor: grab;
    opacity: 0.8;
    touch-action: pan-x;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #f75757;
    box-shadow: 0 0 0 5px #fa9696;
  }
  .rc-slider-handle:focus {
    outline: none;
    box-shadow: none;
  }
  .rc-slider-handle:focus-visible {
    border-color: #f52d2d;
    box-shadow: 0 0 0 3px #fa9696;
  }
  .rc-slider-handle-click-focused:focus {
    border-color: #fa9696;
    box-shadow: unset;
  }
  .rc-slider-handle:hover {
    border-color: #f75757;
  }
  .rc-slider-handle:active {
    border-color: #f75757;
    box-shadow: 0 0 5px #f75757;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    color: #999;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
  .rc-slider-mark-text-active {
    color: #666;
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
  }
  .rc-slider-dot {
    position: absolute;
    bottom: -2px;
    width: 8px;
    height: 8px;
    vertical-align: middle;
    background-color: #fff;
    border: 2px solid #e9e9e9;
    border-radius: 50%;
    cursor: pointer;
  }
  .rc-slider-dot-active {
    border-color: #fa9696;
  }
  .rc-slider-dot-reverse {
    margin-right: -4px;
  }
  .rc-slider-disabled {
    background-color: #e9e9e9;
  }
  .rc-slider-disabled .rc-slider-track {
    background-color: #ccc;
  }
  .rc-slider-disabled .rc-slider-handle,
  .rc-slider-disabled .rc-slider-dot {
    background-color: #fff;
    border-color: #ccc;
    box-shadow: none;
    cursor: not-allowed;
  }
  .rc-slider-disabled .rc-slider-mark-text,
  .rc-slider-disabled .rc-slider-dot {
    cursor: not-allowed !important;
  }
  .rc-slider-vertical {
    width: 14px;
    height: 100%;
    padding: 0 5px;
  }
  .rc-slider-vertical .rc-slider-rail {
    width: 4px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-track {
    bottom: 0;
    left: 5px;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-track-draggable {
    border-top: 0;
    border-bottom: 0;
    border-right: 5px solid rgba(0, 0, 0, 0);
    border-left: 5px solid rgba(0, 0, 0, 0);
    transform: translateX(-5px);
  }
  .rc-slider-vertical .rc-slider-handle {
    position: absolute;
    z-index: 1;
    margin-top: 0;
    margin-left: -5px;
    touch-action: pan-y;
  }
  .rc-slider-vertical .rc-slider-mark {
    top: 0;
    left: 18px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-step {
    width: 4px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-dot {
    margin-left: -2px;
  }
  .rc-slider-tooltip-zoom-down-enter,
  .rc-slider-tooltip-zoom-down-appear {
    display: block !important;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }
  .rc-slider-tooltip-zoom-down-leave {
    display: block !important;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }
  .rc-slider-tooltip-zoom-down-enter.rc-slider-tooltip-zoom-down-enter-active,
  .rc-slider-tooltip-zoom-down-appear.rc-slider-tooltip-zoom-down-appear-active {
    animation-name: rcSliderTooltipZoomDownIn;
    animation-play-state: running;
  }
  .rc-slider-tooltip-zoom-down-leave.rc-slider-tooltip-zoom-down-leave-active {
    animation-name: rcSliderTooltipZoomDownOut;
    animation-play-state: running;
  }
  .rc-slider-tooltip-zoom-down-enter,
  .rc-slider-tooltip-zoom-down-appear {
    transform: scale(0, 0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  .rc-slider-tooltip-zoom-down-leave {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  @keyframes rcSliderTooltipZoomDownIn {
    0% {
      transform: scale(0, 0);
      transform-origin: 50% 100%;
      opacity: 0;
    }
    100% {
      transform: scale(1, 1);
      transform-origin: 50% 100%;
    }
  }
  @keyframes rcSliderTooltipZoomDownOut {
    0% {
      transform: scale(1, 1);
      transform-origin: 50% 100%;
    }
    100% {
      transform: scale(0, 0);
      transform-origin: 50% 100%;
      opacity: 0;
    }
  }
  .rc-slider-tooltip {
    position: absolute;
    top: -9999px;
    left: -9999px;
    visibility: visible;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-tooltip-hidden {
    display: none;
  }
  .rc-slider-tooltip-placement-top {
    padding: 4px 0 8px 0;
  }
  .rc-slider-tooltip-inner {
    min-width: 24px;
    height: 24px;
    padding: 6px 2px;
    color: #fff;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    text-decoration: none;
    background-color: #6c6c6c;
    border-radius: 6px;
    box-shadow: 0 0 4px #d9d9d9;
  }
  .rc-slider-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  .rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
    bottom: 4px;
    left: 50%;
    margin-left: -4px;
    border-width: 4px 4px 0;
    border-top-color: #6c6c6c;
  }
`;

export default StyledRcSlide;
