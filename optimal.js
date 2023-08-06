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
  // checking for invalid inputs
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
    if (htmlContent[i] == "<") {
      while (true) {
        outputHTML += htmlContent[i];
        i++;
        if (htmlContent[i] == ">") {
          outputHTML += htmlContent[i];
          break;
        }
      }
    } else if (z < resolvedPositions.length) {
      if (htmlContent[i - 3] == "b" && htmlContent[i - 2] == "r") j++;
      if (htmlContent[i - 3] == "/" && htmlContent[i - 2] == "a") j++;
      if (htmlContent[i - 3] == "m" && htmlContent[i - 2] == "g") j++;

      if (j == resolvedPositions[z].start && htmlContent[i] === plainText[j]) {
        outputHTML += openingTag;
      }

      outputHTML += htmlContent[i];

      if (
        j + 1 == resolvedPositions[z].end &&
        htmlContent[i] === plainText[j]
      ) {
        outputHTML += closingTag;
        z++;
      }

      j++;
    } else {
      outputHTML += htmlContent[i];
      j++;
    }

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

// console.log(
//   highlightHTMLContent(
//     '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>',
//     "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------",
//     [
//       { start: 241, end: 247 },
//       { start: 518, end: 525 },
//     ]
//   )
// );

module.exports = highlightHTMLContent;
