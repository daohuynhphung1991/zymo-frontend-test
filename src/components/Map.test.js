import React from "react";
import renderer from "react-test-renderer";
import Map from "./Map";

test("Map Component", () => {
  const component = renderer.create(<Map>This is Card Component</Map>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
