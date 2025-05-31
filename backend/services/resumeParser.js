import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parsePDF = async (filePath) => {
  const file = fs.readFileSync(filePath);
  const data = await pdfParse(file);

  const name = data.text.split("\n")[0];
  const emailMatch = data.text.match(/\S+@\S+\.\S+/);
  const email = emailMatch ? emailMatch[0] : "Not found";

  return {
    name,
    email,
    text: data.text,
  };
};

export const parseDocx = async (filePath) => {
  const file = fs.readFileSync(filePath);
  const { value } = await mammoth.extractRawText({ buffer: file });

  const name = value.split("\n")[0];
  const emailMatch = value.match(/\S+@\S+\.\S+/);
  const email = emailMatch ? emailMatch[0] : "Not found";

  return {
    name,
    email,
    text: value,
  };
};
