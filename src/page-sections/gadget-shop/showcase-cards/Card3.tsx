import { FC } from "react";
import Link from "next/link";
import { format } from "date-fns";
import NextImage from "next/image";
import styled from "styled-components";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { H3, Paragraph, SemiSpan, Small } from "@component/Typography";

// styled component
const StyledImage = styled(NextImage)`
  border-radius: 4px;
`;

// ===============================================================
type CardProps = {
  date: string;
  title: string;
  imgUrl: string;
  description: string;
  commentCount: number;
};
// ===============================================================

const Card6: FC<CardProps> = ({ date, title, imgUrl, description, commentCount }) => {
  return (
    <Box>
      <Box mb="1.5rem">
        <StyledImage src={imgUrl} width={588} height={272} layout="responsive" />
      </Box>

      <H3 fontWeight="600" mb="0.25rem">
        {title}
      </H3>

      <FlexBox flexWrap="wrap" alignItems="center" mb="1rem">
        <FlexBox alignItems="center" mr="0.75rem">
          <Icon size="14px" mr="0.5rem" defaultcolor="auto">
            clock-circular-outline
          </Icon>
          <SemiSpan color="text.muted">{format(new Date(date), "dd MMMM, yyyy")}</SemiSpan>
        </FlexBox>

        <FlexBox alignItems="center">
          <Box color="text.muted" mr="0.5rem">
            <Icon size="14px" defaultcolor="currentColor">
              comment
            </Icon>
          </Box>

          <SemiSpan color="text.muted">{commentCount} comments</SemiSpan>
        </FlexBox>
      </FlexBox>

      <Paragraph color="gray.700" mb="0.75rem">
        {description}
      </Paragraph>

      <Link href="#">
        <a>
          <Small fontWeight="700" borderBottom="2px solid" borderColor="primary.main">
            CONTINUE READING
          </Small>
        </a>
      </Link>
    </Box>
  );
};

export default Card6;
