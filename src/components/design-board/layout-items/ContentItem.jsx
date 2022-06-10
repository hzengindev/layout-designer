import React from "react";
import styled from "styled-components";
import { ToolItemType } from "../../../constants/Types";

const ContentItem = ({ content, children, selectLayoutElement }) => {
  return (
    <ContentBox
      onClick={(evt) => {
        selectLayoutElement({
          type: ToolItemType.Content,
          element: content,
        });
        evt.stopPropagation();
      }}
    >
      {content.uniqueName}
    </ContentBox>
  );
};

export default ContentItem;

const ContentBox = styled.div`
  border: 1px solid #ffffff;
  background: #fff6ea;
  cursor: pointer;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    border: 2px dashed #742774;
  }
`;
