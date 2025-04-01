/**
 * @method isEmpty
 * @param {string | number | object} value
 * @returns {boolean} true & false
 * @description Checks if the given value is empty
 */

export function isEmpty(value) {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined") {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    Object.keys(value).length === 0
  ) {
    return true;
  } else {
    return false;
  }
}
