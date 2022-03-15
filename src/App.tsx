import React, { useState, useMemo, Suspense } from "react";
import "./App.css";

import { countriesData } from "constants/countries";

import { Grid, Typography, Divider } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Card, Autocomplete, Map, MenuAppBar } from "components";

import { countryInfoType } from "types/country";
import { positionType } from "types/map";
import { LatLng } from "leaflet";
import { makeStyles } from "@mui/styles";

import logo from "./images/logo.png";

import { useTranslation } from "react-i18next";

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

  // @ts-ignore: Unreachable code error
  const [position, setPosition]: positionType = useState([
    14.058324, 108.277199,
  ]);

  // @ts-ignore: Unreachable code error
  const [makersPosition, setMakersPosition]: positionType[] = useState();

  const { t } = useTranslation();

  const handleChangeCountry = (
    event: SelectChangeEvent,
    value: { label: string; value: string }
  ) => {
    if (value && value.value) {
      const countrySelected = countries.filter((item) => {
        const countryInfo: countryInfoType = item.All;
        return countryInfo.abbreviation === value.value;
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
          // @ts-ignore: Unreachable code error
          setMakersPosition(regionPositionsF);
        } else {
          // @ts-ignore: Unreachable code error
          setRegionSelection(null);

          const countrySelectedInfo = countrySelectedValues[0][1];
          if (countrySelectedInfo?.lat && countrySelectedInfo?.long) {
            setPosition([
              countrySelectedInfo?.lat as LatLng,
              countrySelectedInfo?.long as LatLng,
            ]);
            // @ts-ignore: Unreachable code error
            setMakersPosition([
              [
                countrySelectedInfo?.lat as LatLng,
                countrySelectedInfo?.long as LatLng,
              ],
            ]);
          }
        }
      }
      // @ts-ignore: Unreachable code error
      setCountrySelection(countrySelected);
    }
  };

  const handleChangeRegion = (
    event: SelectChangeEvent,
    newValue: { label: string; value: object }
  ) => {
    const regionSelectionValue = newValue.value;
    if (newValue && regionSelectionValue) {
      // @ts-ignore: Unreachable code error
      if (regionSelectionValue[1]?.lat && regionSelectionValue[1]?.long) {
        setPosition([
          // @ts-ignore: Unreachable code error
          regionSelectionValue[1]?.lat as LatLng,
          // @ts-ignore: Unreachable code error
          regionSelectionValue[1]?.long as LatLng,
        ]);
        // @ts-ignore: Unreachable code error
        setMakersPosition([
          [
            // @ts-ignore: Unreachable code error
            regionSelectionValue[1]?.lat as LatLng,
            // @ts-ignore: Unreachable code error
            regionSelectionValue[1]?.long as LatLng,
          ],
        ]);
      }

      // @ts-ignore: Unreachable code error
      setRegionSelection(regionSelectionValue);
    }
  };

  const renderRegionDetail = (region: countryInfoType, name?: string) => {
    return (
      // @ts-ignore: Unreachable code error
      <Card data={region}>
        <h1>
          {
            // @ts-ignore: Unreachable code error
            countrySelection[0]?.All.country
          }
        </h1>
        <h2>{name ? name : ""}</h2>
        {Object.entries(region).map(([k, v], index) => {
          return k === "country" ? (
            <></>
          ) : (
            <>
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="div">
                    {t(k)}:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" component="div">
                    <span>{v}</span>
                  </Typography>
                </Grid>
              </Grid>
              <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            </>
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
        // @ts-ignore: Unreachable code error
        return renderRegions(countrySelectedInfo);
      }
      // @ts-ignore: Unreachable code error
      return renderRegionDetail(countrySelectedInfo.All);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countrySelection]);

  const renderRegionSelection = useMemo(() => {
    return regionSelection && regionSelection[0] && regionSelection[1]
      ? renderRegionDetail(regionSelection[1], regionSelection[0])
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionSelection]);

  const renderMap = useMemo(() => {
    return (
      position && (
        <Map
          position={position}
          // @ts-ignore: Unreachable code error
          makersPosition={makersPosition ? makersPosition : [position]}
        />
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const classes = useStyles();

  // loading component for suspense fallback
  const Loader = () => (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div>loading...</div>
    </div>
  );

  return (
    <Suspense fallback={<Loader />}>
      <MenuAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5}>
          <div className={classes.container}>
            <Autocomplete
              id="select-country"
              label="Select Country"
              listOptions={countries.map((item) => {
                const countryInfo: countryInfoType = item.All;
                return {
                  label: countryInfo.country,
                  value: countryInfo.abbreviation,
                };
              })}
              // @ts-ignore: Unreachable code error
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
    </Suspense>
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
