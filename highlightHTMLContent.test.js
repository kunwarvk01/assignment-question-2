const highlightHTMLContent = require("./highlightHTMLContent");

describe("highlightHTMLContent", () => {
  // handling empty input
  it("should handle empty input", () => {
    expect(
      highlightHTMLContent("", "HTML content", [{ start: 0, end: 12 }])
    ).toBe("");
    expect(
      highlightHTMLContent("<p>HTML content</p>", "", [{ start: 0, end: 0 }])
    ).toBe("<p>HTML content</p>");
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [])
    ).toBe("<p>HTML content</p>");
  });

  // handling invalid input
  it("should handle invalid input", () => {
    expect(
      highlightHTMLContent(123, "HTML content", [{ start: 0, end: 12 }])
    ).toBe(123);
    expect(
      highlightHTMLContent("<p>HTML content</p>", true, [{ start: 0, end: 12 }])
    ).toBe("<p>HTML content</p>");
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: "a", end: 12 },
      ])
    ).toBe("<p>HTML content</p>");
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 0, end: "b" },
      ])
    ).toBe("<p>HTML content</p>");
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: -1, end: 12 },
      ])
    ).toBe("<p>HTML content</p>");
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 0, end: -1 },
      ])
    ).toBe("<p>HTML content</p>");
  });

  // handling invalid positions
  it("should handle no matches", () => {
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 13, end: 25 },
      ])
    ).toBe("<p>HTML content</p>");
  });

  // handling single position
  it("should handle single position", () => {
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 0, end: 4 },
      ])
    ).toBe("<p><mark>HTML</mark> content</p>");
  });

  // handling multiple positions
  it("should handle multiple positions", () => {
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 0, end: 4 },
        { start: 5, end: 12 },
      ])
    ).toBe("<p><mark>HTML</mark> <mark>content</mark></p>");
  });

  // handling overlapping positions
  it("should handle overlapping matches", () => {
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 0, end: 4 },
        { start: 1, end: 12 },
      ])
    ).toBe("<p><mark>H<mark>TML content</mark></mark></p>");
  });

  // handling nested positions
  it("should handle nested positions", () => {
    expect(
      highlightHTMLContent("<p>HTML content</p>", "HTML content", [
        { start: 0, end: 12 },
        { start: 5, end: 12 },
      ])
    ).toBe("<p><mark>HTML <mark>content</mark></mark></p>");
  });

  // handling complex HTML structure
  it("should handle complex HTML structure", () => {
    const htmlContent = "<div><p>HTML content</p><span>HTML</span></div>";
    const plainText = "HTML contentHTML";
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 12, end: 16 },
    ];
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe(
      "<div><p><mark>HTML</mark> content</p><span><mark>HTML</mark></span></div>"
    );
  });

  // handling really long inputs
  it("should handle long input", () => {
    const htmlContent = "<p>Very long HTML content...</p>";
    const plainText = "Very long HTML content...";
    const plainTextPositions = [{ start: 0, end: 25 }];
    expect(
      highlightHTMLContent(htmlContent, plainText, plainTextPositions)
    ).toBe("<p><mark>Very long HTML content...</mark></p>");
  });
});
