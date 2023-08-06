function handleOverlapsAndNestedPositions(plainTextPositions) {
  plainTextPositions.sort((a, b) => a.start - b.start);
  const updatedPositions = [plainTextPositions[0]];
  let i = 0;

  for (const position of plainTextPositions) {
    if (position.start >= updatedPositions[i].end) {
      // no overlap with the previous position, add it as it is
      updatedPositions.push({ ...position });
      i++;
    } else if (position.end > updatedPositions[i].end) {
      // overlapping or nested position, update the previous position.end if needed
      updatedPositions[i].end = position.end;
    }
  }

  return updatedPositions;
}

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  if (
    !htmlContent ||
    !plainText ||
    !plainTextPositions ||
    plainTextPositions.length == 0 ||
    !isNaN(htmlContent) ||
    !isNaN(plainText)
  ) {
    return htmlContent;
  }

  const openingTag = "<mark>";
  const closingTag = "</mark>";
  let i = 0;
  let j = 0;
  let z = 0;
  let outputHTML = "";

  const resolvedPositions =
    handleOverlapsAndNestedPositions(plainTextPositions);

  while (i < htmlContent.length) {
    if (
      z < plainTextPositions.length &&
      plainTextPositions[z].start == j &&
      htmlContent[i] == plainText[j]
    )
      outputHTML += openingTag;

    // console.log("open" + outputHTML);

    outputHTML += htmlContent[i];

    if (z < plainTextPositions.length && plainTextPositions[z].end == j + 1) {
      outputHTML += closingTag;
      z++;
    }

    if (htmlContent[i] === plainText[j]) j++;
    i++;
  }
  return outputHTML;
}

// console.log(
//   highlightHTMLContent(
//     "<div><p>HTML</p><span>HTML</span></div><div><p>HTML</p><span>HTML</span></div>",
//     "HTMLHTMLHTMLHTML",
//     [
//       { start: 0, end: 4 },
//       { start: 4, end: 8 },
//       { start: 8, end: 12 },
//       { start: 12, end: 16 },
//     ]
//   )
// );

// console.log(
//   highlightHTMLContent("<p>HTML content</p>", "HTML content", [
//     { start: 0, end: 4 },
//     { start: 1, end: 12 },
//   ])
// );

// console.log(
//   highlightHTMLContent("<p>HTML content</p>", "HTML content", [
//     { start: 0, end: 12 },
//     { start: 5, end: 10 },
//   ])
// );

// console.log(
//   highlightHTMLContent("<p>HTML Content</p>", "HTML Content", [
//     { start: 0, end: 4 },
//     { start: 5, end: 12 },
//   ])
// );

// console.log(
//   highlightHTMLContent(
//     "<div><p>HTML content</p><span>HTML</span></div>",
//     "HTML ContentHTML",
//     [
//       { start: 0, end: 4 },
//       { start: 12, end: 16 },
//     ]
//   )
// );

// console.log(
//   highlightHTMLContent(
//     "<div><p>HTML content</p></div><p> this is HTML</p>HTML content</p><p> this is HTML</p>",
//     "HTML content this is HTMLHTML content this is HTML",
//     [
//       { start: 0, end: 4 },
//       { start: 12, end: 17 },
//       { start: 25, end: 29 },
//       { start: 38, end: 42 },
//     ]
//   )
// );

module.exports = highlightHTMLContent;
