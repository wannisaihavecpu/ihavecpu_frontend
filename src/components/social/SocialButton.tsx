import React, { useEffect, useState } from "react";
import { SocialCircle } from "./styles";
import Icon from "@component/icon/Icon";
import Box from "@component/Box";

const SocialButton = () => {
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  const handleCopyClick = () => {
    const link = pageUrl;
    navigator.clipboard.writeText(link);
    setCopied(true);

    // reset
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleFacebookShare = (event) => {
    event.preventDefault();
    const shareUrl = pageUrl;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    window.open(facebookUrl, "Facebook Share", "width=600,height=400");
  };
  const handleLineShare = (event) => {
    event.preventDefault();
    const shareUrl = pageUrl;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${shareUrl}`;

    window.open(lineUrl, "Line Share", "width=600,height=400");
  };

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);
  return (
    <SocialCircle>
      <div className="shareArticle">
        <div className="shareSocial">
          <ul className="socialList">
            <li>
              <Box onClick={handleFacebookShare}>
                <a href="#">
                  <i className="fa-brands fa-facebook-f">
                    <Icon>facebook</Icon>
                  </i>
                </a>
              </Box>
            </li>
            <li>
              <Box onClick={handleLineShare}>
                <a href="#">
                  <i className="fa-brands fa-twitter">
                    <Icon>line</Icon>
                  </i>
                </a>
              </Box>
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
              readOnly
              value={pageUrl}
            />

            <span
              className="copyLink"
              id="copy"
              data-tooltip={copied ? "Copied!" : "Copy to Clipboard"}
            >
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
