import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

let topTenLines = null;

app.get("/get-lines", async (req, res) => {
  if (topTenLines) {
    return res.json({ topTenLines });
  }

  try {
    // Very heavy fetch call and computation, takes a long time to load. Should definately be cached in a better way and or served statically if the data is not updated often.

    const stopResponse = await fetch(
      `https://api.sl.se/api2/LineData.json?model=stop&DefaultTransportModeCode=BUS&key=${process.env.API_KEY}`
    );
    const stopJson = await stopResponse.json();

    const jourResponse = await fetch(
      `https://api.sl.se/api2/LineData.json?model=JourneyPatternPointNumber&DefaultTransportModeCode=BUS&key=${process.env.API_KEY}`
    );
    const jourJson = await jourResponse.json();

    const allLinesAndStops = {};

    const jourData = jourJson?.ResponseData?.Result;
    const stopData = stopJson?.ResponseData?.Result;

    if (jourData && stopData) {
      // Loop through all jour data including line number and stop id
      jourData.forEach((jour) => {
        // Get stop name based on stop id from jour data
        const stopName =
          stopData.find(
            (item) => item.StopPointNumber === jour.JourneyPatternPointNumber
          )?.StopPointName ?? "HÅLLPLATS SAKNAS";

        if (allLinesAndStops[jour.LineNumber] === undefined) {
          // Add new line to object if it does not exist
          allLinesAndStops[jour.LineNumber] = {
            numberOfStops: 1,
            allStops: [{ stopId: jour.JourneyPatternPointNumber, stopName }],
          };
        } else {
          // Increment number of stops and add stop data to allStops array
          allLinesAndStops[jour.LineNumber].numberOfStops++;
          allLinesAndStops[jour.LineNumber].allStops.push({
            stopId: jour.JourneyPatternPointNumber,
            stopName,
          });
        }
      });

      // Sort all bus lines by number of stops and take the top 10
      topTenLines = Object.entries(allLinesAndStops)
        .sort((a, b) => b[1].numberOfStops - a[1].numberOfStops)
        .slice(0, 10);

      return res.json({
        topTenLines,
      });
    }
    return null;
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
