#!/usr/bin/env node

const glob = require("glob");
const zlib = require("zlib");
const fs = require("fs-extra");
const path = require("path");
const sqlite3 = require("sqlite3");

const unzipMbtiles = (mbtiles_path, dest_path) => {
  let db = new sqlite3.Database(mbtiles_path, function (err) {});

  db.each("SELECT * FROM tiles", function (err, row) {
    if (err) {
      console.error(`Error reading ${mbtiles_path}: ${err}`);
    } else {
      let raw = zlib.gunzipSync(new Buffer(row.tile_data));
      let y = (1 << row.zoom_level) - row.tile_row - 1;

      let destPbf = `${dest_path}/${row.zoom_level}/${row.tile_column}/${y}.pbf`;

      fs.mkdirp(path.dirname(destPbf)).then(() => {
        fs.writeFile(
          `${dest_path}/${row.zoom_level}/${row.tile_column}/${y}.pbf`,
          raw
        );
      });
    }
  });
};

const baseFolder = path.resolve("../../");
const targetFolder = `${baseFolder}/.cache/data`;
const relativePath = (path) => path.substr(baseFolder.length + 1);

// get all maps
glob(`${baseFolder}/src/maps/*/`, (err, mapPaths) => {
  mapPaths.forEach((mapPath) => {
    const mapDataPath = `${mapPath}/data`;
    const mapName = path.basename(mapPath);

    // get all data folder contents of maps
    glob(`${mapDataPath}/**/*.*`, (err, dataPaths) => {
      dataPaths.forEach((dataPath) => {
        let relDataPath = dataPath.substr(mapDataPath.length);
        let dataExt = path.extname(relDataPath);

        // unzip mbtiles
        if (dataExt == ".mbtiles") {
          let destPath = `${targetFolder}/${mapName}/${path.basename(
            relDataPath,
            ".mbtiles"
          )}`;
          if (fs.pathExistsSync(destPath)) {
            return console.log(`[exists] ${relativePath(destPath)}`);
          } else {
            console.log(
              `[extracting] ${relativePath(dataPath)} => ${relativePath(
                destPath
              )}`
            );

            fs.mkdirp(path.dirname(destPath)).then(() => {
              unzipMbtiles(dataPath, destPath);
            });
          }

        // copy the rest
        if (dataExt != ".mbtiles") {
          let destPath = `${targetFolder}/${mapName}/${relDataPath}`;
          if (fs.pathExistsSync(destPath))
            return console.log(`[exists] ${relativePath(destPath)}`);
          else {
            console.log(
              `[copying] ${relativePath(dataPath)} => ${relativePath(destPath)}`
            );
            fs.mkdirp(path.dirname(destPath)).then(() => {
              fs.copySync(dataPath, destPath);
            });
          }
        }
      });
    });
  });
});
