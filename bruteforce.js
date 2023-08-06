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
      // overlapping or nested position, update the previous position end if needed
      updatedPositions[i].end = position.end;
    }
  }

  return updatedPositions;
}

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  // checking for invalid inputs
  if (
    !htmlContent ||
    !plainText ||
    !plainTextPositions ||
    plainTextPositions.length === 0 ||
    !isNaN(htmlContent) ||
    !isNaN(plainText)
  ) {
    return htmlContent;
  }

  const openingTag = "<mark>";
  const closingTag = "</mark>";
  plainTextPositions.sort((a, b) => a.start - b.start);

  // new array to store indexes
  let newIndex = [];
  let i = 0;
  let j = 0;
  while (j < htmlContent.length) {
    if (htmlContent.charAt(j) === "<")
      while (htmlContent.charAt(j) !== ">") j++;

    if (htmlContent.charAt(j) === plainText.charAt(i)) {
      newIndex.push(j);
      i++;
    }
    j++;
  }

  // console.log(newIndex);

  // process plainTextPositions to handle overlaps and nested positions
  const resolvedPositions =
    handleOverlapsAndNestedPositions(plainTextPositions);

  // console.log(resolvedPositions);

  // funtion to replace string with added mark tags
  function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
  }

  let offset = 0;
  let outputHTML = htmlContent;

  // iterating for each position in the updated array
  resolvedPositions.forEach((position) => {
    if (
      isNaN(position.start) ||
      isNaN(position.end) ||
      position.start < 0 ||
      position.end < 0 ||
      position.start > plainText.length
    )
      return;
    if (position.end > plainText.length) position.end = plainText.length;

    let highlight = outputHTML.substr(
      newIndex[position.start] + offset,
      position.end - position.start
    );

    // console.log(newIndex[position.start] + offset);
    // console.log(position.end - position.start);

    // console.log("highlight before = " + highlight);
    highlight = openingTag + highlight + closingTag;
    // console.log("highlight after = " + highlight);

    // console.log("outputHTML = " + outputHTML);

    outputHTML = replaceRange(
      outputHTML,
      newIndex[position.start] + offset,
      newIndex[position.end - 1] + offset + 1,
      highlight
    );

    // console.log(
    //   "replaceRange = " +
    //     newIndex[position.start] +
    //     " " +
    //     offset +
    //     "   " +
    //     newIndex[position.end] +
    //     " " +
    //     offset
    // );

    // console.log("outputHTML = " + outputHTML);
    // console.log(" ");
    offset += 13;
  });
  console.log("outputHTML = " + outputHTML);
  return outputHTML;
}
// // <div><p><mark>HTML</mark></p><span>HTML</span></div><div><p>HTML</p><span>HTML</span></div>
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
