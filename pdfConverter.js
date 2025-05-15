const { convertPdfToPng } = require("pdf-to-png-converter");
const path = require("path");
const fs = require("fs").promises;

/**
 * Converts all PDF files in a source folder to PNG files in a destination folder
 * @param {string} sourceFolder - Path to the folder containing PDF files
 * @param {string} destinationFolder - Path to the folder where PNG files will be saved
 * @returns {Promise<Array>} Array of objects containing information about converted files
 */
async function convertPdfToPngFiles(sourceFolder, destinationFolder) {
  try {
    // Ensure the destination folder exists
    await fs.mkdir(destinationFolder, { recursive: true });

    // Read all files from the source folder
    const files = await fs.readdir(sourceFolder);
    const pdfFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      throw new Error("No PDF files found in the source folder");
    }

    const results = [];

    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(sourceFolder, pdfFile);
      const baseFileName = path.basename(pdfFile, ".pdf");

      // Convert PDF to PNG
      const pngPages = await convertPdfToPng(pdfPath, {
        viewportScale: 2.0,
        outputFolder: destinationFolder,
        outputFileMask: `${baseFileName}_page_`,
      });

      results.push({
        pdfFile,
        pagesConverted: pngPages.length,
        outputFiles: pngPages.map((page) => page.path),
      });
    }

    return results;
  } catch (error) {
    throw new Error(`Error converting PDF files: ${error.message}`);
  }
}

module.exports = {
  convertPdfToPngFiles,
};
