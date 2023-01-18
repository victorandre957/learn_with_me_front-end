const notAllowed = ["attributes", "data"];
/**
 * Remove from strapi response the unnecessary keys "attributes", "data", like a "flat" operation.
 */
export default function simplifyStrapiResponse(obj: unknown): unknown {
  if (typeof obj !== "object" || obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map((newObj) => (
      simplifyStrapiResponse(newObj)
    ));
  }

  let newObj = {};

  const entries = Object.entries(obj);
  entries.forEach(([key, value]) => {
    const simplified = simplifyStrapiResponse(value);

    if (
      notAllowed.includes(key)
      && typeof simplified === "object"
      && !Array.isArray(simplified)
    ) {
      Object.assign(newObj, simplified);
    } else if (
      notAllowed.includes(key)
      && typeof simplified === "object"
      && Array.isArray(simplified)
      && entries.length === 1
    ) {
      newObj = simplified;
    } else {
      newObj[key] = simplified;
    }
  });

  return newObj;
}
