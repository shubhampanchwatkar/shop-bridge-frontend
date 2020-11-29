import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import InventoryPage from "./containers/InventoryPage";
import Item from "./components/Item/Item";
import ItemList from "./components/Item/ItemList/ItemList";
import NotFoundPage from "./containers/error/NotFoundPage";

const App = () => {
  const routes = [
    {
      path: "app",
      element: <InventoryPage />,
      children: [
        { path: "item", element: <Item /> },
        { path: "item-list", element: <ItemList /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/app/item" />,
    },
    { path: "404", element: <NotFoundPage /> },
    { path: "*", element: <Navigate to="/404" /> },
  ];

  const routing = useRoutes(routes);
  return <React.Fragment>{routing}</React.Fragment>;
};

export default App;
