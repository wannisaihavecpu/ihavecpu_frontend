import { FC, useEffect, useState } from "react";
import Menu from "../Menu";
import Image from "../Image";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Small } from "../Typography";
import StyledTopbar from "./styles";

const Topbar: FC = () => {
  // const [currency, setCurrency] = useState(currencyList[0]);
  const [language, setLanguage] = useState(languageList[0]);

  // const handleCurrencyClick = (curr: typeof currency) => () => setCurrency(curr);

  const handleLanguageClick = (lang: typeof language) => () => setLanguage(lang);

  useEffect(() => {
    // get language from browser
    // console.log(navigator.language);
  }, []);

  return (
    <StyledTopbar>
      <Container display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <FlexBox className="topbar-left">
          <div className="logo">
            <img src="/assets/images/logo.svg" alt="logo" />
          </div>

          <FlexBox alignItems="center">
            <Icon size="14px">phone-call</Icon>
            <span>+66 86 838 5200</span>
          </FlexBox>

          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>info@ihavecpu.com</span>
          </FlexBox>
        </FlexBox>

        <FlexBox className="topbar-right" alignItems="center">
          <NavLink className="link" href="/">
            ร้านค้าใกล้คุณ
          </NavLink>

          {/* <NavLink className="link" href="/">
            Need Help?
          </NavLink> */}

          <Menu
            direction="right"
            handler={
              <FlexBox className="dropdown-handler" alignItems="center" height="50px"  mr="1.25rem">
                <Image src={language.imgUrl} alt={language.title} />
                <Small fontWeight="600">{language.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {languageList.map((item) => (
              <MenuItem key={item.title} onClick={handleLanguageClick(item)}>
                <Image src={item.imgUrl} borderRadius="50%" mr="0.5rem"  height="20px" alt={item.title} />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>

          {/* <Menu
            direction="right"
            handler={
              <FlexBox className="dropdown-handler" alignItems="center" height="40px">
                <Image src={currency.imgUrl} alt={currency.title} />
                <Small fontWeight="600">{currency.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {currencyList.map((item) => (
              <MenuItem key={item.title} onClick={handleCurrencyClick(item)}>
                <Image src={item.imgUrl} borderRadius="50%" mr="0.5rem"  height="20px" alt={item.title} />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu> */}
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

const languageList = [
  { title: "ไทย", imgUrl: "/assets/images/flags/thai.png" },
  { title: "ENG", imgUrl: "/assets/images/flags/eng.png" },
];

// const currencyList = [
//   { title: "บาท", imgUrl: "/assets/images/flags/thai.png" },
//   { title: "USD", imgUrl: "/assets/images/flags/eng.png" },
// ];

export default Topbar;
