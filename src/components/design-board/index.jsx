import React, { useState } from "react";
import { Button, Col, Container, Modal, ModalBody, Row } from "reactstrap";
import styled from "styled-components";
import Layout from "./Layout";
import Properties from "./Properties";
import Tools from "./Tools";
import { mockLayout } from "../../data/MockData";

const DesignBoard = () => {
  const [layout, setLayout] = useState(mockLayout);
  const [toolItem, setToolItem] = useState();
  const [layoutElement, setLayoutElement] = useState();
  const [preview, setPreview] = useState(false);

  const updateNode = (value, rows) => {
    if (!rows || rows.length === 0) return [];
    return rows.map((_row) => {
      if (_row.id === value.id) {
        return { ..._row, ...value };
      }
      return {
        ..._row,
        cols: _row.cols.map((_col) => {
          if (_col.id === value.id) {
            return { ..._col, ...value };
          }
          if (_col.content?.id == value.id) {
            return { ..._col, content: { ...value } };
          }
          return { ..._col, rows: updateNode(value, _col.rows) };
        }),
      };
    });
  };

  const handleUpdateNode = (value) => {
    const rows = updateNode(value, layout.rows);
    setLayout({ ...layout, rows: rows });
    setLayoutElement({ ...layoutElement, element: value });
  };

  const removeNode = (id, rows) => {
    const filteredRows = rows.reduce((rowResult, row) => {
      if (row.id !== id) {
        const _cols = row.cols.reduce((colResult, col) => {
          if (col.id !== id) {
            const _rows = removeNode(id, col.rows);
            let _col = { ...col };
            _col.rows = [..._rows];
            _col.content = _col.content?.id === id ? null : _col.content;
            colResult.push(_col);
          }

          return colResult;
        }, []);

        const _row = { ...row, cols: _cols };
        rowResult.push(_row);
      }
      return rowResult;
    }, []);

    return filteredRows;
  };

  const handleRemoveNode = (id) => {
    const rows = removeNode(id, layout.rows);
    setLayout({ ...layout, rows: rows });
    setLayoutElement(null);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs="12" className="px-0">
          <Header>
            <h3>Layout Designer</h3>
            <ActionButtons>
              <Button color="primary" onClick={() => setPreview(true)}>
                Preview
              </Button>
              <Button color="success" onClick={() => alert("Saved...")}>
                Save
              </Button>
            </ActionButtons>
          </Header>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="3" lg="2" className="px-0">
          <Tools selectToolItem={(item) => setToolItem(item)} />
        </Col>
        <Col xs="12" sm="12" md="6" lg="8">
          <Layout
            toolItem={toolItem}
            selectLayoutElement={(element) => setLayoutElement(element)}
            layout={layout}
            setLayout={setLayout}
          />
        </Col>
        <Col xs="12" sm="12" md="3" lg="2" className="px-0">
          <Properties
            layoutElement={layoutElement}
            removeNode={handleRemoveNode}
            updateNode={handleUpdateNode}
          />
        </Col>
      </Row>
      <Modal
        isOpen={preview}
        toggle={() => setPreview(!preview)}
        size="xl"
        scrollable
      >
        <ModalBody>
          <pre>{JSON.stringify(layout, null, 2)}</pre>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default DesignBoard;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background: #742774;
  color: #fff;
  padding: 0px 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;
