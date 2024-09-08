export const formatComicName = (input: string) => {
  // Remove numeric prefix and hyphen
  const namePart = input.replace(/^\d+-/, "");

  // Convert to Title Case
  const titleCase = namePart
    .split("-") // Split by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and lowercase the rest
    .join(" "); // Join words with spaces

  return titleCase;
};
