import shopBridgeBackendAxios from "../../axios/shop-bridge-backend";

export const REQUEST_ADD_ITEM_DATA = "REQUEST_ADD_ITEM_DATA";
export const RECEIVE_ADD_ITEM_DATA = "RECEIVE_ADD_ITEM_DATA";
export const RECEIVE_ADD_ITEM_ERROR = "RECEIVE_ADD_ITEM_ERROR";

export const REQUEST_ITEMS_DATA = "REQUEST_ITEMS_DATA";
export const RECEIVE_ITEMS_DATA = "RECEIVE_ITEMS_DATA";
export const RECEIVE_ITEMS_ERROR = "RECEIVE_ITEMS_ERROR";

export const REQUEST_DELETE_ITEM_DATA = "REQUEST_DELETE_ITEM_DATA";
export const RECEIVE_DELETE_ITEM_DATA = "RECEIVE_DELETE_ITEM_DATA";
export const RECEIVE_DELETE_ITEM_ERROR = "RECEIVE_DELETE_ITEM_ERROR";

const requestAddItemData = () => {
  return {
    type: REQUEST_ADD_ITEM_DATA,
  };
};

const receiveAddItemData = () => {
  return {
    type: RECEIVE_ADD_ITEM_DATA,
  };
};

const receiveAddItemError = (message) => {
  return {
    type: RECEIVE_ADD_ITEM_ERROR,
    message,
  };
};

const requestItemsData = () => {
  return { type: REQUEST_ITEMS_DATA };
};

const receiveItemsData = (items) => {
  return { type: RECEIVE_ITEMS_DATA, items };
};

const receiveItemsError = (message) => {
  return { type: RECEIVE_ITEMS_ERROR, message };
};

const requestDeleteItemData = () => {
  return {
    type: REQUEST_DELETE_ITEM_DATA,
  };
};

const receiveDeleteItemData = (itemId) => {
  return {
    type: RECEIVE_DELETE_ITEM_DATA,
    id: itemId,
  };
};

const receiveDeleteItemError = (message) => {
  return {
    type: RECEIVE_DELETE_ITEM_ERROR,
    message,
  };
};

export const addItemData = (form, navigate) => {
  return (dispatch) => {
    dispatch(requestAddItemData());
    shopBridgeBackendAxios
      .post(`/items`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(receiveAddItemData());
        navigate("/app/item-list");
      })
      .catch((error) => {
        dispatch(receiveAddItemError(error.message));
      });
  };
};

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(requestItemsData());
    shopBridgeBackendAxios
      .get(`/items`)
      .then((response) => {
        dispatch(receiveItemsData(response.data));
      })
      .catch((error) => {
        dispatch(receiveItemsError(error.message));
      });
  };
};

export const deleteItem = (itemId) => {
  return (dispatch) => {
    //dispatch(requestDeleteItemData());
    shopBridgeBackendAxios
      .delete(`/items/${itemId}`)
      .then((response) => {
        if (response.status === 200) dispatch(receiveDeleteItemData(itemId));
      })
      .catch((error) => {
        //dispatch(receiveDeleteItemError(error.message));
      });
  };
};
