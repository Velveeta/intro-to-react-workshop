import { DELETE_ITEM } from './exercise.constants';
import { deleteItem } from './exercise.action-handlers';

// Generate a list of 20 items for the initial state
const INITIAL_STATE = {
  items: (new Array(20)).fill(true).map((_, index) => `Item #${index + 1}`),
};

// The reducer is already created for you, but you need to implement
// the action that dispatches DELETE_ITEM, and the handler that does
// the actual state transformation to remove the item from the list.
const actionMap = {
  [DELETE_ITEM]: (state, action) => deleteItem(state, action),
};

export default (state = INITIAL_STATE, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
