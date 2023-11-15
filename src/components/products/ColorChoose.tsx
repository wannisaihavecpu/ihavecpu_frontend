import React, { FC } from "react";
import Grid from "@component/grid/Grid";
import { ColorCircle } from "@component/buttons";

type Props = {
  open: boolean;
  title: string;
  product_id: string;
  choice: string;
  selected: boolean;
  bg?: string;
  onClick: () => void;
  disabled?: boolean;
};

const ColorChoose: FC<Props> = (props) => {
  const { choice, bg, selected, onClick, disabled } = props;
  const contentWidth = `${choice.length * 10}px`;

  const containerStyle = {
    marginBottom: "10px",
  };

  return (
    <Grid container style={containerStyle}>
      <ColorCircle
        mr="5px"
        size="extrasmall"
        color="ihavecpu"
        variant="containOutlined"
        style={{
          flex: 1,
          width: contentWidth,
          cursor: disabled ? "not-allowed" : "pointer",
          color: selected ? "white" : bg,
          backgroundColor: selected ? "#d4001a" : bg,
          opacity: disabled ? 0.7 : 1,
        }}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {choice}
      </ColorCircle>
    </Grid>
  );
};

export default ColorChoose;
