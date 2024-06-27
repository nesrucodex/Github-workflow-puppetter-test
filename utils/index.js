import fs from "fs/promises";
import path from "path";
export async function writeToFile(filename, content = "") {
  const folderName = path.dirname(filename);
  
  try {
    await fs.mkdir(folderName, { recursive: true });
    await fs.appendFile(filename, content);
  } catch (err) {
    console.error(err?.message);
  }
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


