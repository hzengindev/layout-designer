import React from "react";
import { Row } from "reactstrap";
import styled from "styled-components";
import { ToolItemType } from "../../../constants/Types";
import { GenerateUUID } from "../../../utils/Helper";

const RowItem = ({
  row,
  toolItem,
  selectLayoutElement,
  addColumn,
  children,
}) => {
  return (
    <RowBox
      itemType={toolItem?.itemType}
      onClick={(evt) => {
        selectLayoutElement({
          type: ToolItemType.Row,
          element: row,
        });
        evt.stopPropagation();
      }}
      onDrop={(evt) => {
        if (evt.currentTarget !== evt.target) return;
        var toolItemType = parseInt(evt.dataTransfer.getData("toolItemType"));
        if (toolItemType !== ToolItemType.Col) return;

        const newCol = {
          id: GenerateUUID(),
          name: "",
          classes: "",
          xsSize: 12,
          smSize: 12,
          mdSize: 12,
          lgSize: 12,
          content: null,
          rows: [],
        };

        addColumn(newCol);
      }}
      onDragOver={(evt) => evt.preventDefault()}
    >
      {children}
    </RowBox>
  );
};

export default RowItem;

const RowBox = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 20px;
  padding: 20px;
  min-height: 50px;
  background: ${(prop) =>
    prop.itemType === ToolItemType.Col ? "#92B4EC" : "#EBD8C3"};
  cursor: pointer;

  :hover {
    border: 2px dashed #742774;
  }
`;
