import React from "react";

import spainIcon from "../img/spain.png";
import franceIcon from "../img/france.png";
import andorraIcon from "../img/andorra.png";

import isMobileDevice from "is-mobile";

import { format } from "timeago.js";
import { Popup } from "@urbica/react-map-gl";

const FeaturePopup = (props) => {
  let { feature, type, offsets, ...passedProps } = props;
  let featProps = feature.properties;
  let layerId = feature.layer.id;

  let [lon, lat] = feature.geometry.coordinates;
  let isMobile = isMobileDevice();
  let popupOffset =
    typeof offsets[layerId] === "function"
      ? offsets[layerId](feature)
      : offsets[layerId];

  let countryIcons = {
    France: franceIcon,
    Spain: spainIcon,
    Andorra: andorraIcon,
  };

  return (
    <Popup
      longitude={lon}
      latitude={lat}
      offset={popupOffset}
      maxWidth={512}
      {...passedProps}
    >
      {/* pyr_resupply */}
      {layerId === "pyr_resupply" && (
        <div style={{ textAlign: "center" }}>
          <div>{featProps.name}</div>
          <div>
            <img
              src={countryIcons[featProps.country]}
              style={{ height: "1em", marginRight: "0.5em" }}
            />
            {featProps.place}, {featProps.country}
          </div>
          <div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${featProps.name}, ${featProps.address}`
              )}`}
              target="_blank"
            >
              (view on Google Maps)
            </a>
          </div>
        </div>
      )}
      {/* pyr_refuges */}
      {layerId === "pyr_refuges" && (
        <div>
          <div
            style={{
              maxWidth: "calc(100vw - 50px)",
              width: type === "detail" ? "320px" : "200px",
              paddingBottom: "66%",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                alignItems: "cener",
                justifyContent: "center",
              }}
            >
              {(featProps.photo && (
                <img
                  src={`https://www.pyrenees-refuges.com/media/photo/${featProps.photo}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )) || <div>(no photo)</div>}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            {type === "detail" && (
              <a
                href={`http://www.pyrenees-refuges.com/fr/affiche.php?numenr=${featProps.id}`}
                target="_blank"
              >
                (view on pyrenees-refuges.com)
              </a>
            )}
            {type === "hover" && (
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {featProps.name || "(unknown)"}
                </div>
                <div style={{ textAlign: "right", fontSize: "0.8em" }}>
                  <span>(via pyrenees-refuges.com)</span>
                </div>
              </div>
            )}
          </div>
          {type === "detail" && (
            <div>
              <div>
                <span style={{ fontWeight: "bold" }}>Name:</span>
                {featProps.name || "(unknown)"}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Altitude:</span>
                {`${featProps.alt}m` || "(unknown)"}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Capacity:</span>
                {featProps.cap || "(unknown)"}
              </div>
            </div>
          )}
        </div>
      )}
      {/* gdv_updates */}
      {layerId === "gdv_updates" && (
        <div
          style={{
            width: type === "detail" ? "360px" : "200px",
            maxWidth: "calc(100vw - 50px)",
          }}
        >
          <div
            style={{
              paddingBottom: "66%",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                alignItems: "cener",
                justifyContent: "center",
              }}
            >
              {(featProps.photo && (
                <img
                  src={`${featProps.photo}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )) || <div>(no photo)</div>}
            </div>
          </div>
          <div
            className="font-barlow"
            style={{
              textAlign: "center",
              fontSize:
                type === "hover" ? "1.2em" : isMobile ? "1.2em" : "1.5em",
              margin: type === "hover" ? "0.25em 0" : "0.35em 0",
            }}
          >
            {type === "detail" && (
              <span>
                {new Date(featProps.time).toUTCString()} (
                {format(featProps.time)})
              </span>
            )}
            {type === "hover" && (
              <span>
                {featProps.time.split("T")[0]} ({format(featProps.time)})
              </span>
            )}
          </div>
          <div
            className="font-palanquin"
            style={{
              position: "relative",
              lineHeight: type === "hover" ? "1.2em" : "1.5em",
              maxHeight: type === "hover" ? "3.6em" : "6em",
              fontSize: type === "hover" ? "0.9em" : "auto",
              overflowY: type === "hover" ? "hidden" : "scroll",
              textAlign: type === "hover" ? "justify" : "auto",
            }}
          >
            {featProps.caption}

            {type === "hover" && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "#fff",
                  paddingLeft: "0.5em",
                }}
              >
                ...
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
};

FeaturePopup.defaultProps = {
  offsets: {
    gdv_updates: (f) => {
      let gdvPinHeight = 114;

      // determine offset of popup layer by icon size
      // have the popup cursor start at 90% of the icon height
      let pinOffset =
        typeof f.layer.layout === "undefined"
          ? 50
          : gdvPinHeight * 0.9 * f.layer.layout["icon-size"];

      return {
        top: [0, 0],
        "top-left": [0, 0],
        "top-right": [0, 0],
        bottom: [0, -pinOffset],
        "bottom-left": [0, -pinOffset],
        "bottom-right": [0, -pinOffset],
        left: [0, 0],
        right: [0, 0],
      };
    },
    pyr_refuges: 10,
    pyr_resupply: 10,
  },
};

export default FeaturePopup;

export const popupHeights = {
  gdv_updates: 390,
  pyr_refuges: 250,
  pyr_resupply: 50,
};
