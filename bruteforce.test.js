const highlightHTMLContent = require("./bruteforce");

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

    const htmlContent3 = "<p>HTML content</p>";
    const plainText3 = "HTML content";
    const plainTextPositions3 = [{ start: "a", end: 12 }];
    const expectedOutput3 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent3, plainText3, plainTextPositions3)
    ).toBe(expectedOutput3);

    const htmlContent4 = "<p>HTML content</p>";
    const plainText4 = "HTML content";
    const plainTextPositions4 = [{ start: 0, end: "b" }];
    const expectedOutput4 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent4, plainText4, plainTextPositions4)
    ).toBe(expectedOutput4);

    const htmlContent5 = "<p>HTML content</p>";
    const plainText5 = "HTML content";
    const plainTextPositions5 = [{ start: -1, end: 12 }];
    const expectedOutput5 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent5, plainText5, plainTextPositions5)
    ).toBe(expectedOutput5);

    const htmlContent6 = "<p>HTML content</p>";
    const plainText6 = "HTML content";
    const plainTextPositions6 = [{ start: 0, end: -1 }];
    const expectedOutput6 = "<p>HTML content</p>";
    expect(
      highlightHTMLContent(htmlContent6, plainText6, plainTextPositions6)
    ).toBe(expectedOutput6);
  });

  // handling invalid positions
  it("should handle no matches", () => {
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
});
