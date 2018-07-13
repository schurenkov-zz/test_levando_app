import { combineReducers } from "redux";
import * as types from "../actions/action-types";

let ids = [];

function randomNumber() {
  let id = Math.floor(Math.random() * 100);

  if (ids.includes(id)) {
    return randomNumber();
  } else {
    ids = [...ids, id];
    return id;
  }
}

const blocks = Array.from({ length: 10 }, () => ({
  id: randomNumber(),
  text: Math.random()
    .toString(36)
    .substr(2, 10),
  type: Math.floor(Math.random() * 100) > 50 ? "complex" : "simple"
}));

const initialState = {
  blocks: blocks
};

const indexReducer = function(state = initialState, action) {
  switch (action.type) {
    case types.DELETE:
      let newBlocks = state.blocks.filter(function(block) {
        return block.id !== action.id;
      });
      ids = ids.filter(function(block) {
        return block !== action.id;
      });
      return Object.assign({}, state, { blocks: newBlocks });

    case types.EDIT:
      const copyState = Object.assign({}, state);
      copyState.blocks.forEach((val, i) => {
        if (val.id == action.id) {
          copyState.blocks[i].type = "complex";
        }
      });
      return copyState;

    case types.NEW:
      const copyStateNew = Object.assign({}, state);
      let newBLoc = {
        id: randomNumber(),
        text: Math.random()
          .toString(36)
          .substr(2, 10),
        type: "simple"
      };
      copyStateNew.blocks = [...copyStateNew.blocks, newBLoc];
      return copyStateNew;
  }
  return state;
};

export default combineReducers({
  indexState: indexReducer
});
