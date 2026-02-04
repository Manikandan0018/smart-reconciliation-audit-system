import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // v1.1.1 exports a function

export const parsePDF = async (buffer) => {
  const data = await pdfParse(buffer);

  if (!data || typeof data.text !== "string") {
    throw new Error("PDF text extraction failed");
  }

  return data.text;
};
