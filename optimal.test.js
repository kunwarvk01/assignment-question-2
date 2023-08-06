const highlightHTMLContent = require("./optimal");

describe("highlightHTMLContent", () => {
  // handling empty input
  it("should handle empty input", () => {
    const htmlContent = "";
    const plainText = "HTML content";
    const plainTextPositions = [{ start: 0, end: 12 }];
    const expectedOutput = "";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);

    const htmlContent2 = "<p>HTML content</p>";
    const plainText2 = "";
    const plainTextPositions2 = [{ start: 0, end: 0 }];
    const expectedOutput2 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent2, plainText2, plainTextPositions2)
    ).toBe(expectedOutput2);

    const htmlContent3 = "<p>HTML content</p>";
    const plainText3 = "HTML content";
    const plainTextPositions3 = [];
    const expectedOutput3 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent3, plainText3, plainTextPositions3)
    ).toBe(expectedOutput3);
  });

  // handling invalid input
  it("should handle invalid input", () => {
    const htmlContent = 123;
    const plainText = "HTML content";
    const plainTextPositions = [{ start: 0, end: 12 }];
    const expectedOutput = 123;
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);

    const htmlContent2 = "<p>HTML content</p>";
    const plainText2 = true;
    const plainTextPositions2 = [{ start: 0, end: 12 }];
    const expectedOutput2 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent2, plainText2, plainTextPositions2)
    ).toBe(expectedOutput2);
  });

  // handling invalid positions
  it("should handle invalid positions", () => {
    const htmlContent = "<p>HTML content</p>";
    const plainText = "HTML content";
    const plainTextPositions = [{ start: 13, end: 25 }];
    const expectedOutput = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling single position
  it("should handle single position", () => {
    const htmlContent = "<p>HTML content</p>";
    const plainText = "HTML content";
    const plainTextPositions = [{ start: 0, end: 4 }];
    const expectedOutput = "<p><mark>HTML</mark> content</p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling multiple positions
  it("should handle multiple positions", () => {
    const htmlContent = "<p>HTML content</p>";
    const plainText = "HTML content";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 5, end: 12 },
    ];
    const expectedOutput = "<p><mark>HTML</mark> <mark>content</mark></p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling overlapping positions
  it("should handle overlapping matches", () => {
    const htmlContent = "<p>HTML content</p>";
    const plainText = "HTML content";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 1, end: 12 },
    ];
    const expectedOutput = "<p><mark>HTML content</mark></p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling nested positions
  it("should handle nested positions", () => {
    const htmlContent = "<p>HTML content</p>";
    const plainText = "HTML content";
    const plainTextPositions = [
      { start: 0, end: 12 },
      { start: 5, end: 10 },
    ];
    const expectedOutput = "<p><mark>HTML content</mark></p>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling complex HTML structure
  it("should handle complex HTML structure", () => {
    const htmlContent = "<div><p>HTML content</p><span> HTML</span></div>";
    const plainText = "HTML content HTML";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 12, end: 17 },
    ];
    const expectedOutput =
      "<div><p><mark>HTML</mark> content</p><span><mark> HTML</mark></span></div>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling really long inputs
  it("should handle long input", () => {
    const htmlContent =
      "<div><p>HTML </p><span>HTML </span></div><div><p>HTML </p><span>HTML </span></div>".repeat(
        25
      );
    const plainText = "HTML HTML HTML HTML ".repeat(25);
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 5, end: 9 },
      { start: 10, end: 14 },
      { start: 15, end: 19 },
      { start: 20, end: 24 },
      { start: 25, end: 29 },
      { start: 30, end: 34 },
      { start: 35, end: 39 },
      { start: 40, end: 44 },
      { start: 45, end: 49 },
      { start: 50, end: 54 },
      { start: 55, end: 59 },
      { start: 60, end: 64 },
      { start: 65, end: 69 },
      { start: 70, end: 74 },
      { start: 75, end: 79 },
      { start: 80, end: 84 },
      { start: 85, end: 89 },
      { start: 90, end: 94 },
      { start: 95, end: 99 },
      { start: 100, end: 104 },
      { start: 105, end: 109 },
      { start: 110, end: 114 },
      { start: 115, end: 119 },
      { start: 120, end: 124 },
      { start: 125, end: 129 },
      { start: 130, end: 134 },
      { start: 135, end: 139 },
      { start: 140, end: 144 },
      { start: 145, end: 149 },
      { start: 150, end: 154 },
      { start: 155, end: 159 },
      { start: 160, end: 164 },
      { start: 165, end: 169 },
      { start: 170, end: 174 },
      { start: 175, end: 179 },
      { start: 180, end: 184 },
      { start: 185, end: 189 },
      { start: 190, end: 194 },
      { start: 195, end: 199 },
      { start: 200, end: 204 },
      { start: 205, end: 209 },
      { start: 210, end: 214 },
      { start: 215, end: 219 },
      { start: 220, end: 224 },
      { start: 225, end: 229 },
      { start: 230, end: 234 },
      { start: 235, end: 239 },
      { start: 240, end: 244 },
      { start: 245, end: 249 },
      { start: 250, end: 254 },
      { start: 255, end: 259 },
      { start: 260, end: 264 },
      { start: 265, end: 269 },
      { start: 270, end: 274 },
      { start: 275, end: 279 },
      { start: 280, end: 284 },
      { start: 285, end: 289 },
      { start: 290, end: 294 },
      { start: 295, end: 299 },
      { start: 300, end: 304 },
      { start: 305, end: 309 },
      { start: 310, end: 314 },
      { start: 315, end: 319 },
      { start: 320, end: 324 },
      { start: 325, end: 329 },
      { start: 330, end: 334 },
      { start: 335, end: 339 },
      { start: 340, end: 344 },
      { start: 345, end: 349 },
      { start: 350, end: 354 },
      { start: 355, end: 359 },
      { start: 360, end: 364 },
      { start: 365, end: 369 },
      { start: 370, end: 374 },
      { start: 375, end: 379 },
      { start: 380, end: 384 },
      { start: 385, end: 389 },
      { start: 390, end: 394 },
      { start: 395, end: 399 },
      { start: 400, end: 404 },
      { start: 405, end: 409 },
      { start: 410, end: 414 },
      { start: 415, end: 419 },
      { start: 420, end: 424 },
      { start: 425, end: 429 },
      { start: 430, end: 434 },
      { start: 435, end: 439 },
      { start: 440, end: 444 },
      { start: 445, end: 449 },
      { start: 450, end: 454 },
      { start: 455, end: 459 },
      { start: 460, end: 464 },
      { start: 465, end: 469 },
      { start: 470, end: 474 },
      { start: 475, end: 479 },
      { start: 480, end: 484 },
      { start: 485, end: 489 },
      { start: 490, end: 494 },
      { start: 495, end: 499 },
    ];
    const expectedOutput =
      "<div><p><mark>HTML</mark> </p><span><mark>HTML</mark> </span></div><div><p><mark>HTML</mark> </p><span><mark>HTML</mark> </span></div>".repeat(
        25
      );
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });

  // handling the given sample test case
  it("should handle the given sample testcase", () => {
    const htmlContent =
      '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
    const plainText =
      "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------";
    const plainTextPositions = [
      { start: 241, end: 247 },
      { start: 518, end: 525 },
    ];
    const expectedOutput =
      '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | <mark>Privacy</mark> Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });
});
