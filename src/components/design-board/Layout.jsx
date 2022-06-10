import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import { ToolItemType } from "../../constants/Types";
import { GenerateUUID } from "../../utils/Helper";
import { ReactSortable } from "react-sortablejs";
import RowItem from "./layout-items/RowItem";
import ColumnItem from "./layout-items/ColumnItem";
import ContentItem from "./layout-items/ContentItem";

const reactSortableStyle = {
  margin: "0px",
  padding: "0px",
};

const Layout = ({ toolItem, selectLayoutElement, layout, setLayout }) => {
  const replaceNode = (id, value, rows) => {
    if (!rows || rows.length === 0) return [];
    return rows.map((_row) => {
      if (_row.id === id) {
        return { ..._row, ...value };
      }
      return {
        ..._row,
        cols: _row.cols.map((_col) => {
          if (_col.id === id) {
            return { ..._col, ...value };
          }
          return { ..._col, rows: replaceNode(id, value, _col.rows) };
        }),
      };
    });
  };

  const renderRows = (rows, parentNode) => {
    if (!rows || rows.length === 0) return null;

    return (
      <ReactSortable
        className="sort-container"
        style={reactSortableStyle}
        list={rows}
        animation={200}
        delayOnTouchStart={true}
        delay={2}
        setList={(sorted) => {
          if (parentNode) {
            const _col = { ...parentNode, rows: [...sorted] };
            const _rows = replaceNode(parentNode.id, _col, layout.rows);
            setLayout({
              ...layout,
              rows: _rows,
            });
          } else {
            setLayout({ ...layout, rows: sorted });
          }
        }}
      >
        {rows.map((row) => (
          <RowItem
            key={row.id}
            row={row}
            toolItem={toolItem}
            selectLayoutElement={selectLayoutElement}
            addColumn={(newColumn) => {
              const _row = { ...row, cols: [...row.cols, newColumn] };
              const _rows = replaceNode(row.id, _row, layout.rows);
              setLayout({
                ...layout,
                rows: _rows,
              });
            }}
          >
            {renderColumns(row.cols, row)}
          </RowItem>
        ))}
      </ReactSortable>
    );
  };

  const renderColumns = (cols, parentNode) => {
    if (!cols || cols.length === 0) return null;

    return (
      <ReactSortable
        className="row sort-container"
        style={reactSortableStyle}
        list={cols}
        animation={200}
        delayOnTouchStart={true}
        delay={2}
        setList={(sorted) => {
          const _row = { ...parentNode, cols: [...sorted] };
          const _rows = replaceNode(parentNode.id, _row, layout.rows);
          setLayout({
            ...layout,
            rows: _rows,
          });
        }}
      >
        {cols.map((col) => (
          <ColumnItem
            key={col.id}
            col={col}
            toolItem={toolItem}
            selectLayoutElement={selectLayoutElement}
            addRow={(newRow) => {
              const _col = { ...col, rows: [...col.rows, newRow] };
              const _rows = replaceNode(col.id, _col, layout.rows);
              setLayout({
                ...layout,
                rows: _rows,
              });
            }}
            addContent={(newContent) => {
              const _col = { ...col, content: newContent };
              const _rows = replaceNode(col.id, _col, layout.rows);
              setLayout({
                ...layout,
                rows: _rows,
              });
            }}
          >
            {col.content ? (
              <ContentItem
                content={col.content}
                selectLayoutElement={selectLayoutElement}
              />
            ) : (
              renderRows(col.rows, col)
            )}
          </ColumnItem>
        ))}
      </ReactSortable>
    );
  };

  return (
    <LayoutContainer>
      <Board>
        <ContainerBox
          fluid
          itemType={toolItem?.itemType}
          onDrop={(evt) => {
            if (evt.currentTarget !== evt.target) return;
            var toolItemType = parseInt(
              evt.dataTransfer.getData("toolItemType")
            );
            if (toolItemType !== ToolItemType.Row) return;

            setLayout({
              ...layout,
              rows: [
                ...layout.rows,
                {
                  id: GenerateUUID(),
                  name: "",
                  classes: "",
                  cols: [],
                },
              ],
            });
          }}
          onDragOver={(evt) => evt.preventDefault()}
        >
          {renderRows(layout.rows)}
        </ContainerBox>
      </Board>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  padding-top: 12px;
`;

const Board = styled.div`
  background: #fff;
  min-height: calc(100vh - 100px);
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-size: 12px;
`;

const ContainerBox = styled(Container)`
  padding: 0;
  padding-bottom: 50px;
  min-height: 100px;
  background: ${(prop) =>
    prop.itemType === ToolItemType.Row ? "#92B4EC" : "#ffffff"};
`;
