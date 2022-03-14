import React, { useState, useMemo } from "react";
import "./App.css";

import { countriesData } from "constants/countries";

import { Grid, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Card, Autocomplete, Map, MenuAppBar } from "components";

import { countryInfoType, countryType } from "types/country";
import { positionType } from "types/map";
import { LatLng } from "leaflet";
import { makeStyles } from "@mui/styles";

function App() {
  const countries = Object.values(countriesData)
    .filter((item) => {
      const countryInfo: countryInfoType = item.All;
      return countryInfo.abbreviation && countryInfo.country;
    })
    .map((item, index) => {
      return item;
    });

  const [countrySelection, setCountrySelection] = useState("");
  const [regionSelection, setRegionSelection] = useState();

  const [position, setPosition]: positionType = useState([
    14.058324, 108.277199,
  ]);
  const [makersPosition, setMakersPosition]: positionType[] = useState();

  const handleChangeCountry = (
    event: SelectChangeEvent,
    value: { label: string; value: string }
  ) => {
    if (value && value.value) {
      const countrySelected = countries.filter((item) => {
        const countryInfo: countryInfoType = item.All;
        return countryInfo.abbreviation == value.value;
      });

      if (countrySelected && countrySelected[0]) {
        const countrySelectedValues = Object.entries(countrySelected[0]);
        if (countrySelectedValues.length > 1) {
          const regionPositions = countrySelectedValues.map((item, index) => {
            const { lat, long } = item[1];
            if (lat && long) return [lat, long];
            return null;
          });
          const regionPositionsF = regionPositions.filter((item) => {
            return item !== null;
          });
          setPosition(regionPositionsF[0]);
          setMakersPosition(regionPositionsF);
        } else {
          setRegionSelection(null);

          const countrySelectedInfo = countrySelectedValues[0][1];
          if (countrySelectedInfo?.lat && countrySelectedInfo?.long) {
            setPosition([
              countrySelectedInfo?.lat as LatLng,
              countrySelectedInfo?.long as LatLng,
            ]);
            setMakersPosition([
              [
                countrySelectedInfo?.lat as LatLng,
                countrySelectedInfo?.long as LatLng,
              ],
            ]);
          }
        }
      }
      setCountrySelection(countrySelected);
    }
  };

  const handleChangeRegion = (
    event: SelectChangeEvent,
    newValue: { label: string; value: object }
  ) => {
    const regionSelectionValue = newValue.value;
    if (newValue && regionSelectionValue) {
      if (regionSelectionValue[1]?.lat && regionSelectionValue[1]?.long) {
        setPosition([
          regionSelectionValue[1]?.lat as LatLng,
          regionSelectionValue[1]?.long as LatLng,
        ]);
        setMakersPosition([
          [
            regionSelectionValue[1]?.lat as LatLng,
            regionSelectionValue[1]?.long as LatLng,
          ],
        ]);
      }

      setRegionSelection(regionSelectionValue);
    }
  };

  const renderRegionDetail = (region: countryInfoType, name?: string) => {
    return (
      <Card data={region}>
        <h1>{countrySelection[0]?.All.country}</h1>
        <h2>{name ? name : ""}</h2>
        {Object.entries(region).map(([k, v]) => {
          return (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle1" component="div">
                  {k}:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" component="div">
                  {v}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Card>
    );
  };

  const renderRegions = (region: countryInfoType[]) => {
    return (
      <Autocomplete
        id="select-region"
        label="Select Region"
        listOptions={Object.entries(region).map((item, index) => {
          return {
            label: item[0] === "All" ? "All Regions" : item[0],
            value: item,
          };
        })}
        onChangeValue={handleChangeRegion}
      />
    );
  };

  const renderCountrySelection = useMemo(() => {
    if (countrySelection && countrySelection[0]) {
      const countrySelectedInfo = countrySelection[0];
      const countRegions = Object.values(countrySelectedInfo).length;
      if (countRegions > 1) {
        return renderRegions(countrySelectedInfo);
      }
      return renderRegionDetail(countrySelectedInfo.All);
    }
  }, [countrySelection]);

  const renderRegionSelection = useMemo(() => {
    return regionSelection && regionSelection[0] && regionSelection[1]
      ? renderRegionDetail(regionSelection[1], regionSelection[0])
      : null;
  }, [regionSelection]);

  const renderMap = useMemo(() => {
    return (
      position && (
        <Map
          position={position}
          makersPosition={makersPosition ? makersPosition : [position]}
        />
      )
    );
  }, [position]);

  const classes = useStyles();

  return (
    <>
      <MenuAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5}>
          <div className={classes.container}>
            <Autocomplete
              id="select-country"
              label="Select Country"
              listOptions={countries.map((item, index) => {
                const countryInfo: countryInfoType = item.All;
                return {
                  label: countryInfo.country,
                  value: countryInfo.abbreviation,
                };
              })}
              value={countrySelection?.id}
              onChangeValue={handleChangeCountry}
            />

            {renderCountrySelection}

            {renderRegionSelection}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={7} className={classes.contentRight}>
          {renderMap}
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  contentRight: {
    padding: 20,
  },
});

export default App;
