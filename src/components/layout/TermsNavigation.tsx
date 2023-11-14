import { Fragment } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import NavLink from "@component/nav-link";
import { getTheme } from "@utils/utils";

// styled component
const TermsNavigationWrapper = styled(Card)`
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 64px);
    box-shadow: none;
    overflow-y: auto;
  }
`;

const StyledDashboardNav = styled(NavLink)<{ isCurrentPath?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid;
  color: ${({ isCurrentPath }) => (isCurrentPath ? getTheme("colors.primary.main") : "inherit")};
  border-left-color: ${({ isCurrentPath }) =>
    isCurrentPath ? getTheme("colors.primary.main") : "transparent"};

  .dashboard-nav-icon-holder {
    color: ${getTheme("colors.gray.600")};
  }

  :hover {
    border-left-color: ${getTheme("colors.primary.main")};

    .dashboard-nav-icon-holder {
      color: ${getTheme("colors.primary.main")};
    }
  }
`;

const TermsNavigation = () => {
  const { pathname } = useRouter();

  return (
    <TermsNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledDashboardNav
              px="1.5rem"
              mb="1.25rem"
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>

                <span>{item.title}</span>
              </FlexBox>

              {/* <span>{item.count}</span> */}
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </TermsNavigationWrapper>
  );
};

const linkList = [
  {
    title: "เกี่ยวกับเรา",
    list: [
        { href: "/terms/Aboutus", title: "เกี่ยวกับ iHAVECPU", iconName: "comment"},
        { href: "/terms/Contactus", title: "ติดต่อ iHAVECPU", iconName: "customer-service"},
        { href: "/terms/Terms", title: "ข้อกำหนดและเงื่อนไข", iconName: "credit" },
        { href: "/terms/Privacy", title: "นโยบายความเป็นส่วนตัว", iconName: "shield"},
    ],
  },
  {
    title: "บริการลูกค้า",
    list: [
      { href: "/terms/Shippings", title: "การจัดส่งสินค้า", iconName: "truck" },
      { href: "/terms/Warrantys", title: "การรับประกันสินค้า", iconName: "feedback-thumbs-up"},
    //   { href: "/terms/Warrantys", title: "การรับประกันสินค้า", iconName: "pin"},
      { href: "/terms/Cancellations", title: "การยกเลิกการสั่งซื้อสินค้า", iconName: "_close" },
      { href: "/terms/Returns", title: "การคืนสินค้าและการคืนเงิน", iconName: "credit-card-2" },
    ],
  },
];

export default TermsNavigation;
