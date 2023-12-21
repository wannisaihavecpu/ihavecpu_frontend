import React, { useRef, useEffect, Fragment, useState } from "react";
import { SocialCircle } from "./styles";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";

const SocialButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    // Logic to copy the link to the clipboard (You can use document.execCommand('copy') or other methods)
    // For this example, let's assume the link is stored in a variable named 'link'
    const link = "https://example.com";
    navigator.clipboard.writeText(link);
    setCopied(true);

    // Reset copied state after a certain duration
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <SocialCircle>
      <div className="shareArticle">
        <div className="shareSocial">
          <ul className="socialList">
            <li>
              <a href="">
                <i className="fa-brands fa-facebook-f">
                  <Icon>facebook</Icon>
                </i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa-brands fa-twitter">
                  <Icon>line</Icon>
                </i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shareLink">
          <div className="permalink">
            <input
              className="textLink"
              id="text"
              type="text"
              name="shortlink"
              value="https://www.graphicpie.com/css-text-hover-effects/"
            />
            <span className="copyLink" id="copy">
              <i className="fa-regular fa-copy">
                <Icon onClick={handleCopyClick}>copy</Icon>
              </i>
            </span>
          </div>
        </div>
      </div>
    </SocialCircle>
  );
};

export default SocialButton;
