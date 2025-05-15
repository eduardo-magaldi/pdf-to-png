const pdftopic = require("pdftopic");

module.exports = {
  convertPdfToPic,
};

async function convertPdfToPic(pdfBuffer, baseFileName, pageNumbers) {
  const inputPageNumbers = pageNumbers.map((number) => {
    return number - 1;
  });

  const converted_result = await pdftopic.pdftobuffer(
    pdfBuffer,
    inputPageNumbers
  );

  const results = [];

  converted_result.forEach((file, index) => {
    const pageNumber = pageNumbers[index];
    const fileObject = {
      fileName: `${baseFileName}-page-${pageNumber}.png`,
      buffer: file,
    };
    results.push(fileObject);
  });

  return results;
}
