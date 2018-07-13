import * as types from "../actions/action-types";

export function deleteElement(id) {
  return {
    type: types.DELETE,
    id
  };
}

export function editElement(id) {
  return {
    type: types.EDIT,
    id
  };
}
