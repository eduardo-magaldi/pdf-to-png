const { convertPdfToPngFiles } = require("./pdfConverter");

// Example usage
async function main() {
  try {
    const results = await convertPdfToPngFiles(
      "/path/to/pdf/folder",
      "/path/to/output/folder"
    );
    console.log("Conversion results:", results);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
