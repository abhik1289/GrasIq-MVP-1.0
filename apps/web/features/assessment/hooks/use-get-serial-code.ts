function useGetSerialCode(
  type: "A" | "a" | "number" | "roman_no" | "custom",
  index: number
) {
  function toRoman(num: number): string {
    const romans = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ] as const;

    let result = "";
    for (const [letter, value] of romans) {
      while (num >= value) {
        result += letter;
        num -= value;
      }
    }
    return result.toLowerCase(); // lowercase roman
  }
  switch (type) {
    case "A":
      return String.fromCharCode(65 + index);
    case "a":
      return String.fromCharCode(97 + index);
    case "number":
      return `${index + 1}`;
    case "roman_no":
      return toRoman(index + 1);
    case "custom":
    default:
      return `Q${index + 1}`;
  }
}

export default useGetSerialCode;
