import React from "react";
import renderer from "react-test-renderer";
import Autocomplete from "./Autocomplete";
import { countriesData } from "constants/countries";

test("Autocomplete Component", () => {
  const countries = Object.values(countriesData)
    .filter((item) => {
      const countryInfo = item.All;
      return countryInfo.abbreviation && countryInfo.country;
    })
    .map((item, index) => {
      return item;
    });

  const component = renderer.create(
    <Autocomplete
      id={"select-country"}
      label={"Select Country"}
      listOptions={countries.map((item) => {
        const countryInfo = item.All;
        return {
          label: countryInfo.country,
          value: countryInfo.abbreviation,
        };
      })}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
