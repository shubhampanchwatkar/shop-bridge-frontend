import {
  REQUEST_ADD_ITEM_DATA,
  RECEIVE_ADD_ITEM_DATA,
  RECEIVE_ADD_ITEM_ERROR,
  REQUEST_ITEMS_DATA,
  RECEIVE_ITEMS_DATA,
  RECEIVE_ITEMS_ERROR,
  REQUEST_DELETE_ITEM_DATA,
  RECEIVE_DELETE_ITEM_DATA,
  RECEIVE_DELETE_ITEM_ERROR,
} from "../actions/item";

const initialState = {
  addItemRedirecting: false,
  addItemRedirectError: undefined,
  isLoading: true,
  items: [],
  itemsError: undefined,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ADD_ITEM_DATA:
      return {
        ...state,
        addItemRedirecting: true,
        addItemRedirectError: undefined,
      };
    case RECEIVE_ADD_ITEM_DATA:
      return {
        ...state,
        addItemRedirecting: false,
      };
    case RECEIVE_ADD_ITEM_ERROR:
      return {
        ...state,
        addItemRedirecting: false,
        addItemRedirectError: action.message,
      };
    case REQUEST_ITEMS_DATA:
      return {
        ...state,
        isLoading: true,
        itemsError: undefined,
      };
    case RECEIVE_ITEMS_DATA:
      return {
        ...state,
        isLoading: false,
        items: action.items,
      };
    case RECEIVE_ITEMS_ERROR:
      return {
        ...state,
        isLoading: false,
        itemsError: action.message,
      };
    case RECEIVE_DELETE_ITEM_DATA: {
      const previosItems = [...state.items];

      const removeIndex = previosItems.findIndex(
        (item) => item.id === action.id
      );

      const updatedItem = [
        ...previosItems.slice(0, removeIndex),
        ...previosItems.slice(removeIndex + 1),
      ];
      return {
        ...state,
        items: updatedItem,
      };
    }
    default:
      return state;
  }
};

export default itemReducer;
