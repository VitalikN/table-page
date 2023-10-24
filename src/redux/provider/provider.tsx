"use client";

import { Provider } from "react-redux";
import store from "../store";
import { persistStore } from "redux-persist";
import { IProps } from "../../types/types";

persistStore(store);

export const ReduxProvider: React.FC<IProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
