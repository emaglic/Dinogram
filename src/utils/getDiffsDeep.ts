import _ from "lodash";

const getObjectDifferences = <T>(obj1: T, obj2: T) => {
  if (_.isEqual(obj1, obj2)) return {}; // If equal, no differences

  if (_.isArray(obj1) && _.isArray(obj2)) {
    return compareArrays(obj1, obj2);
  }

  if (_.isObject(obj1) && _.isObject(obj2)) {
    return compareObjects(obj1, obj2);
  }

  return { from: obj1, to: obj2 }; // Base case for primitive differences
};

// ✅ Compare two objects deeply
export const compareObjects = <T>(obj1: T, obj2: T) => {
  const diffs = {};

  // Check all keys from both objects
  _.forEach({ ...obj1, ...obj2 }, (value, key) => {
    if (!_.has(obj2, key)) {
      diffs[key] = { from: obj1[key], to: undefined }; // Key was removed
    } else if (!_.has(obj1, key)) {
      diffs[key] = { from: undefined, to: obj2[key] }; // Key was added
    } else {
      const nestedDiffs = getObjectDifferences(obj1[key], obj2[key]);
      if (!_.isEmpty(nestedDiffs)) {
        diffs[key] = nestedDiffs;
      }
    }
  });

  return diffs;
};

// ✅ Compare two arrays (of objects or primitives)
export const compareArrays = <T>(arr1: T, arr2: T) => {
  const diffs = [];

  arr1.forEach((item, index) => {
    if (index >= arr2.length) {
      diffs.push({ index, from: item, to: undefined }); // Item removed
    } else {
      const diff = getObjectDifferences(item, arr2[index]);
      if (!_.isEmpty(diff)) {
        diffs.push({ index, ...diff });
      }
    }
  });

  // Check for new items in arr2
  arr2.slice(arr1.length).forEach((item, index) => {
    diffs.push({ index: arr1.length + index, from: undefined, to: item }); // Item added
  });

  return diffs.length > 0 ? diffs : undefined;
};
