import React from "react";
import { Col } from "reactstrap";
import styled from "styled-components";
import { ToolItemType } from "../../../constants/Types";
import { GenerateUUID } from "../../../utils/Helper";

const ColumnItem = ({
  col,
  toolItem,
  selectLayoutElement,
  addRow,
  addContent,
  children,
}) => {
  return (
    <ColBox
      itemType={toolItem?.itemType}
      onClick={(evt) => {
        selectLayoutElement({
          type: ToolItemType.Col,
          element: col,
        });
        evt.stopPropagation();
      }}
      xs={col.xsSize}
      sm={col.smSize}
      md={col.mdSize}
      lg={col.lgSize}
      onDrop={(evt) => {
        if (evt.currentTarget !== evt.target) return;
        var toolItemType = parseInt(evt.dataTransfer.getData("toolItemType"));
        if (
          toolItemType !== ToolItemType.Row &&
          toolItemType !== ToolItemType.Content
        )
          return;

        if (toolItemType === ToolItemType.Row && !col.content) {
          const newRow = {
            id: GenerateUUID(),
            name: "",
            classes: "",
            cols: [],
          };
          addRow(newRow);
        }

        if (toolItemType === ToolItemType.Content && col.rows.length === 0) {
          addContent({ id: GenerateUUID(), uniqueName: "Select Content" });
        }
      }}
      onDragOver={(evt) => evt.preventDefault()}
    >
      {children}
    </ColBox>
  );
};

export default ColumnItem;

const ColBox = styled(Col)`
  margin-bottom: 20px;
  padding: 20px;
  min-height: 50px;
  background: ${(prop) =>
    prop.itemType === ToolItemType.Row || prop.itemType === ToolItemType.Content
      ? "#92B4EC"
      : "#F7E9D7"};
  cursor: pointer;

  :hover {
    border: 2px dashed #742774;
  }
`;
