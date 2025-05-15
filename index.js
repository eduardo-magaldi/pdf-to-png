const fs = require("fs");
const { convertPdfToPic } = require("./pdftopic");
const path = require("path");

const pdfFileName = "PresentationBookA-Grade1.pdf";
const pdfPath = path.join("./pdfs", pdfFileName);
const pdfBuffer = fs.readFileSync(pdfPath);
const baseFileName = path.basename(pdfFileName, ".pdf");

(async () => {
  const results = await convertPdfToPic(
    pdfBuffer,
    baseFileName,
    [9, 10, 11, 12, 13, 14]
  );

  results.forEach((result) => {
    const { fileName, buffer } = result;
    const outputPath = path.join("./pngs", fileName);
    fs.writeFileSync(outputPath, buffer);
  });
})();
