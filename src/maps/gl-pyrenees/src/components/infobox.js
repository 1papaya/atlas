import React, { useState, useEffect } from "react";
import { Info, ChevronsRight } from "react-feather";

import SvgLine from "../../../../components/svgline";
import gdvPin from "../img/gdvPin.png";
import iconShopping from "../img/shopping.png";
import iconMountain from "../img/mountain.png";
import iconRefuge from "../img/refuge.png";

export default (props) => {
  let [isOpen, setIsOpen] = useState(props.isOpen);

  let iconProps = {
    onClick: () => {
      setIsOpen(!isOpen);
    },
  };

  return (
    <div
      className="mapboxgl-ctrl-group mapboxgl-ctrl-infobox"
      style={
        isOpen
          ? {
              position: "absolute",
              margin: "10px",
              top: 0,
              right: 0,
              zIndex: 99,
              width: 300,
              maxWidth: "calc(100vw - 20px)",
              maxHeight: "calc(100vh - 20px)",
              overflowY: "auto",
            }
          : {
              position: "absolute",
              margin: "10px",
              top: 0,
              right: 0,
              zIndex: 99,
              overflow: "hidden",
              width: "30px",
              height: "30px",
            }
      }
    >
      <div className="mapboxgl-ctrl" style={{ position: "relative" }}>
        <div className="icon" style={{ float: "right", margin: "3px" }}>
          {isOpen ? <ChevronsRight {...iconProps} /> : <Info {...iconProps} />}
        </div>
        <div className="content" style={{ padding: 10 }}>
          <h1>Pyrenees Adventure Map</h1>
          <p>
            Open source interactive online map of Pyrenees mountain range with
            live backpacker tracking
          </p>
          <h2>Map Symbology</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div className="symbol">
              <img className="symbol-icon" src={gdvPin} /> Location Update
            </div>
            <div className="symbol">
              <SvgLine
                className="symbol-icon"
                lines={[
                  { stroke: "#fff", strokeWidth: 5 },
                  { stroke: "#d582ff", strokeWidth: 3 },
                ]}
              />{" "}
              Trekking Route
            </div>
            <div className="symbol">
              <img className="symbol-icon" src={iconMountain} /> Peak &gt;3000m
            </div>
            <div className="symbol">
              <img className="symbol-icon" src={iconRefuge} /> Refuge
            </div>
            <div className="symbol">
              <img className="symbol-icon" src={iconShopping} /> Resupply
            </div>
            <div className="symbol">
              <SvgLine
                className="symbol-icon"
                lines={[
                  { stroke: "#fff", strokeWidth: 5 },
                  { stroke: "#f00", strokeWidth: 3 },
                ]}
              />{" "}
              Haute Randonnée Pyrénéenne (HRP)
            </div>
            <div className="symbol">
              <SvgLine
                className="symbol-icon"
                lines={[
                  { stroke: "#fff", strokeWidth: 5 },
                  { stroke: "rgba(234, 118, 24, 1)", strokeWidth: 3 },
                ]}
              />{" "}
              Major Hiking Route
            </div>
            <div className="symbol">
              <SvgLine
                className="symbol-icon"
                lines={[
                  { stroke: "#fff", strokeWidth: 5 },
                  {
                    stroke: "rgba(234, 118, 24, 1)",
                    strokeDasharray: "3 2",
                    strokeWidth: 2,
                  },
                ]}
              />{" "}
              Minor Route
            </div>
            <div className="symbol">
              <SvgLine
                className="symbol-icon"
                lines={[
                  { stroke: "#fff", strokeWidth: 5 },
                  {
                    stroke: "#000",
                    strokeWidth: 2,
                  },
                ]}
              />{" "}
              Automobile Road
            </div>
          </div>
          <h2>Map Data Sources</h2>
          <ul>
            <li>
              <div style={{ fontSize: "1.1em" }}>
                <a href="https://openstreetmap.org" target="_blank">
                  OpenStreetMap
                </a>
              </div>
              <div>Hiking routes, peaks, base vector data</div>
            </li>
            <li>
              <div style={{ fontSize: "1.1em" }}>
                <a href="https://maptiler.com" target="_blank">
                  MapTiler
                </a>
              </div>
              <div>Hillshade, contours, tile hosting</div>
            </li>
            <li>
              <div style={{ fontSize: "1.1em" }}>
                <a href="https://pyrenees-refuges.com" target="_blank">
                  pyrenees-refuges.com
                </a>
              </div>
              <div>Pyrenees refuges database &amp; photos</div>
            </li>
            <li>
              <div style={{ fontSize: "1.1em" }}>
                <a href="https://maps.google.com" target="_blank">
                  Google Maps
                </a>
              </div>
              <div>Resupply supermarket locations</div>
            </li>
          </ul>
          <h2>Source Code</h2>
          <ul>
            <li>
              <div style={{ fontSize: "1.1em" }}>
                <a
                  href="https://github.com/1papaya/gl-pyrenees"
                  target="_blank"
                >
                  gl-pyrenees
                </a>
              </div>
              <p>
                Interactive map source code, written in React and Mapbox GL JS
              </p>
            </li>
            <li>
              <div style={{ fontSize: "1.1em" }}>
                <a href="https://github.com/1papaya/caminoBot" target="_blank">
                  caminoBot
                </a>
              </div>
              <p>
                Location updater source code, using Telegram, Netlify, FaunaDB,
                OpenRouteService
              </p>
            </li>
          </ul>
          <h2>Special Acknowledgements</h2>
          <p>
            Big shout out to the OSM France &amp; Spain communities for
            contributing such quality data to the OSM basemap, especially{" "}
            <a href="https://wiki.openstreetmap.org/wiki/HRP" target="_blank">
              those who worked on the massive HRP route relation
            </a>
            . Bon travail / Buen trabajo ! :)
          </p>
          <p>
            Also big shout out to{" "}
            <a href="https://pyrenees-refuges.com" target="_blank">
              pyrenees-refuges.com
            </a>
            ! Amazing dataset, merci for making it available!
          </p>
          <p>
            Last, big ups to Mapbox, Netlify, MapTiler and Github for their free
            offerings which make this site possible. You da real MVP!
          </p>
        </div>
      </div>
    </div>
  );
};
