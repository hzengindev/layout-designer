import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styled from "styled-components";
import { ToolItemType } from "../../constants/Types";

const Properties = ({ layoutElement, removeNode, updateNode }) => {
  const handleChange = (property, value) => {
    let node = { ...layoutElement.element };
    node[property] = value;
    updateNode(node);
  };

  const rowProperties = () => {
    const { element } = layoutElement;
    return (
      <Form>
        <h5>Row</h5>
        <FormGroup className="mb-2">
          <Label size="sm">Name</Label>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Name"
            value={element.name}
            onChange={(e) => handleChange("name", e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label size="sm">Classes</Label>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Classes"
            value={element.classes}
            onChange={(e) => handleChange("classes", e.currentTarget.value)}
          />
        </FormGroup>
      </Form>
    );
  };

  const colProperties = () => {
    const { element } = layoutElement;
    return (
      <Form>
        <h5>Column</h5>
        <FormGroup className="mb-2">
          <Label size="sm">Name</Label>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Name"
            value={element.name}
            onChange={(e) => handleChange("name", e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label size="sm">Classes</Label>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Classes"
            value={element.classes}
            onChange={(e) => handleChange("classes", e.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label size="sm">XS</Label>
          <Input
            type="number"
            bsSize="sm"
            placeholder="XS"
            value={element.xsSize}
            onChange={(e) =>
              handleChange(
                "xsSize",
                e.currentTarget.value !== ""
                  ? parseInt(e.currentTarget.value, 10)
                  : 0
              )
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label size="sm">SM</Label>
          <Input
            type="number"
            bsSize="sm"
            placeholder="SM"
            value={element.smSize}
            onChange={(e) =>
              handleChange(
                "smSize",
                e.currentTarget.value !== ""
                  ? parseInt(e.currentTarget.value, 10)
                  : 0
              )
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label size="sm">MD</Label>
          <Input
            type="number"
            bsSize="sm"
            placeholder="MD"
            value={element.mdSize}
            onChange={(e) =>
              handleChange(
                "mdSize",
                e.currentTarget.value !== ""
                  ? parseInt(e.currentTarget.value, 10)
                  : 0
              )
            }
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label size="sm">LG</Label>
          <Input
            type="number"
            bsSize="sm"
            placeholder="LG"
            value={element.lgSize}
            onChange={(e) =>
              handleChange(
                "lgSize",
                e.currentTarget.value !== ""
                  ? parseInt(e.currentTarget.value, 10)
                  : 0
              )
            }
          />
        </FormGroup>
      </Form>
    );
  };

  const contentProperties = () => {
    const { element } = layoutElement;
    return (
      <Form>
        <h5>Content</h5>
        <FormGroup>
          <Label size="sm">Unique Name</Label>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Unique Name"
            value={element.uniqueName}
            onChange={(e) => handleChange("uniqueName", e.currentTarget.value)}
          />
        </FormGroup>
      </Form>
    );
  };

  return (
    <PropertiesContainer>
      <header>Properties</header>
      {layoutElement && (
        <>
          <div className="mt-2">
            {layoutElement.type === ToolItemType.Row && rowProperties()}
            {layoutElement.type === ToolItemType.Col && colProperties()}
            {layoutElement.type === ToolItemType.Content && contentProperties()}
          </div>
          <hr />
          <Button
            color="danger"
            onClick={() => removeNode(layoutElement.element.id)}
          >
            Remove Item
          </Button>
        </>
      )}
    </PropertiesContainer>
  );
};

export default Properties;

const PropertiesContainer = styled.div`
  min-height: calc(100vh);
  display: flex;
  flex-direction: column;
  background-color: #f3f2f1;
  z-index: 1;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 18px;
  border-left: #e1dfdd;
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
