import { LatLng, LatLngLiteral, LatLngTuple } from "leaflet";
export type countryInfoType = {
  abbreviation?: string;
  capital_city?: string;
  confirmed?: number;
  continent?: string;
  country?: string;
  deaths?: number;
  elevation_in_meters?: string | null;
  iso?: number;
  lat?: LatLng | LatLngLiteral | LatLngTuple;
  life_expectancy?: string;
  location?: string;
  long?: LatLng | LatLngLiteral | LatLngTuple;
  population?: number;
  recovered?: number;
  sq_km_area?: number;
  updated?: string;
};

export type countryType = countryInfoType[];
