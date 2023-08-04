function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
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

  let newIndex = [];
  let i = 0;
  let j = 0;
  while (j < htmlContent.length) {
    if (htmlContent.charAt(j) === plainText.charAt(i)) {
      newIndex.push(j);
      i++;
    }
    j++;
  }
  // console.log(newIndex);

  function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
  }

  let offset = 0;
  let outputHTML = htmlContent;
  plainTextPositions.forEach((position) => {
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

    // console.log("highlight before = " + highlight);
    highlight = openingTag + highlight + closingTag;
    // console.log("highlight after = " + highlight);

    outputHTML =
      position.end === plainText.length
        ? replaceRange(
            outputHTML,
            newIndex[position.start] + offset,
            newIndex[position.end - 1] + offset + 1,
            highlight
          )
        : replaceRange(
            outputHTML,
            newIndex[position.start] + offset,
            newIndex[position.end] + offset,
            highlight
          );

    offset += openingTag.length + closingTag.length;
  });

  return outputHTML;
}

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
module.exports = highlightHTMLContent;
