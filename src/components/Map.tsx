import * as React from "react";
import { forwardRef, HTMLAttributes, useMemo, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import { positionType } from "types/map";
import { makeStyles } from "@mui/styles";

/**
 * This is a Map component.
 */
const Map = forwardRef<HTMLDivElement, MapProps>(
  ({ label = "", id, zoom = 7, position, makersPosition, ...props }, ref) => {
    const animateRef = useRef(false);

    const classes = useStyles(props);

    return useMemo(
      () => (
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={false}
          className={classes.mapWrapper}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapConsumer>
            {(map) => {
              if (position)
                map.setView(position, map.getZoom(), {
                  animate: animateRef.current || false,
                });
              return null;
            }}
          </MapConsumer>

          {makersPosition ? (
            makersPosition.length === 1 ? (
              <Marker position={makersPosition[0]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            ) : (
              makersPosition.map((maker) => {
                return (
                  <Marker position={maker}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                );
              })
            )
          ) : (
            <></>
          )}
        </MapContainer>
      ),
      [position, makersPosition]
    );
  }
);

const useStyles = makeStyles({
  mapWrapper: {
    marginTop: 50,
  },
});

export interface MapProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  id?: string;
  zoom?: number;
  position?: positionType;
  makersPosition?: positionType[];
}

export default Map;
