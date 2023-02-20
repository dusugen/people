import React from "react";
import { Border, Spin, Root } from "./Spinner.styles";

function Spinner() {
  return (
    <Root>
      <Border>
        <Spin />
      </Border>
    </Root>
  );
}

export default Spinner;
