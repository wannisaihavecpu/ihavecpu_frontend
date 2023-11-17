import styled from "styled-components";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import { layoutConstant } from "utils/constants";

const ContainerHome = styled.div<
  LayoutProps & ColorProps & PositionProps & SpaceProps & FlexboxProps
>`
  margin-left: auto;
  margin-right: auto;
  max-width: ${layoutConstant.containerWidth};

  @media only screen and (max-width: 1199px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media only screen and (max-width: 900px) {
    margin-left: 0rem;
    margin-right: 0rem;
  }

  ${color}
  ${position}
  ${flexbox}
  ${layout}
  ${space}
`;

export default ContainerHome;
