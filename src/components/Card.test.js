import React from "react";
import renderer from "react-test-renderer";
import Card from "./Card";

test("Card Component", () => {
  const component = renderer.create(<Card>This is Card Component</Card>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
