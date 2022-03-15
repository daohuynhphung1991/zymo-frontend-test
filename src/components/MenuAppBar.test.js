import React from "react";
import renderer from "react-test-renderer";
import MenuAppBar from "./MenuAppBar";

test("MenuAppBar Component", () => {
  const component = renderer.create(
    <MenuAppBar>This is Card Component</MenuAppBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
