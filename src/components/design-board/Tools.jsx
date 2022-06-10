import React from "react";
import styled from "styled-components";
import { ToolItemType } from "../../constants/Types";

const Tools = ({ selectToolItem }) => {
  const handleDragStart = (evt, itemType) => {
    evt.dataTransfer.setData("toolItemType", itemType);
    selectToolItem({ itemType: itemType });
  };

  const handleDragEnd = (evt) => {
    selectToolItem(null);
  };

  return (
    <ToolsContainer>
      <header>Tools</header>
      <div className="mt-2">
        <Item
          draggable
          onDragStart={(evt) => handleDragStart(evt, ToolItemType.Row)}
          onDragEnd={(evt) => handleDragEnd(evt)}
        >
          <Shape color="#EBD8C3">Row</Shape>
        </Item>
        <Item
          draggable
          onDragStart={(evt) => handleDragStart(evt, ToolItemType.Col)}
          onDragEnd={(evt) => handleDragEnd(evt)}
        >
          <Shape color="#F7E9D7">Column</Shape>
        </Item>
        <Item
          draggable
          onDragStart={(evt) => handleDragStart(evt, ToolItemType.Content)}
          onDragEnd={(evt) => handleDragEnd(evt)}
        >
          <Shape color="#FFF6EA">Content</Shape>
        </Item>
      </div>
    </ToolsContainer>
  );
};

export default Tools;

const ToolsContainer = styled.div`
  min-height: calc(100vh);
  display: flex;
  flex-direction: column;
  background-color: #f3f2f1;
  z-index: 1;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 18px;
  border-right: 1px solid #e1dfdd;
  padding: 12px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  header {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }
`;

const Item = styled.div`
  margin-bottom: 10px;
`;

const Shape = styled.div`
  border-radius: 4px;
  background: ${(prop) => prop.color};
  color: #3a5ba0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 48px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  user-select: none;

  :hover {
    background: #742774;
    color: #fff;
  }
`;
