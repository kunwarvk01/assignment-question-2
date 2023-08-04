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
      "<div><p>HTML content</p><span> HTML</span></div><div><p>HTML content</p><span> HTML</span></div>";
    const plainText = "HTML content HTMLHTML content HTML";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 12, end: 17 },
      { start: 17, end: 21 },
      { start: 29, end: 34 },
    ];
    const expectedOutput =
      "<div><p><mark>HTML</mark> content</p><span><mark> HTML</mark></span></div><div><p><mark>HTML</mark> content</p><span><mark> HTML</mark></span></div>";
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(expectedOutput);
  });
});
