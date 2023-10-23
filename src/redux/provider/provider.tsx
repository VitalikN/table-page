"use client";

import { Provider } from "react-redux";
import store from "../store";
import { persistStore } from "redux-persist";

interface IProps {
  children: React.ReactNode;
}

persistStore(store);

export const ReduxProvider: React.FC<IProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
