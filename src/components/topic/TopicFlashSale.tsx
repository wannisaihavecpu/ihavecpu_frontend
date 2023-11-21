import Link from "next/link";
import { FC } from "react";
import FlexBox from "./../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan } from "../Typography";
import { colorOptions } from "../../interfaces";
import CountdownTimer from "@component/flashsale/CountdownTimer";
import useWindowSize from "@hook/useWindowSize";

export interface TopicFlashSaleProps {
  title?: string;
  iconName?: string;
  seeMoreLink?: string;
  color?: colorOptions;
  dateTimeExpired?: string;
}

const TopicFlashSale: FC<TopicFlashSaleProps> = ({
  title,
  iconName,
  seeMoreLink,
  color,
  dateTimeExpired,
}) => {
  const targetDate = new Date(dateTimeExpired);
  const width = useWindowSize();

  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <FlexBox alignItems="center">
        {iconName && (
          <Icon defaultcolor="auto" color={color ?? null} mr="0.5rem">
            {iconName}
          </Icon>
        )}
        <H3 fontWeight="bold" lineHeight="1" color="#d4001a" mr="0.5rem">
          {title}
        </H3>
        {width > 900 && <CountdownTimer targetDate={targetDate} />}
      </FlexBox>

      {width > 900 && seeMoreLink && (
        <Link href={seeMoreLink}>
          <a>
            <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
              <SemiSpan mr="0.5rem">ดูทั้งหมด</SemiSpan>
              <Icon size="12px" defaultcolor="currentColor">
                right-arrow
              </Icon>
            </FlexBox>
          </a>
        </Link>
      )}
      {width <= 900 && <CountdownTimer targetDate={targetDate} />}
    </FlexBox>
  );
};

export default TopicFlashSale;
