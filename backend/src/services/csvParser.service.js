import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSV = (buffer) =>
  new Promise((resolve, reject) => {
    const results = [];

    Readable.from(buffer)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
