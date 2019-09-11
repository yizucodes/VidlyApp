import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  //Convert to lodash wrapper to perform slice and
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
