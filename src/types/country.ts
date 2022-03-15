import { LatLng, LatLngLiteral, LatLngTuple } from "leaflet";
export type countryInfoType = {
  abbreviation?: string;
  capital_city?: string | null;
  confirmed?: number;
  continent?: string;
  country?: string;
  deaths?: number;
  elevation_in_meters?: number | string | null;
  iso?: number | string | null;
  lat?: LatLng | LatLngLiteral | LatLngTuple | string | number | null;
  life_expectancy?: number | string | null;
  location?: string | null;
  long?: LatLng | LatLngLiteral | LatLngTuple | string | number | null;
  population?: number | null;
  recovered?: number | null;
  sq_km_area?: number | null;
  updated?: string | null;
};

export type countryType = countryInfoType[];
