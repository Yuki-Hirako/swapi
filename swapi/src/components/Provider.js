"use client";

import { SearchProvider } from "../contexts/SearchContext";
import { AuthProvider } from "./context";

const Provider = ({ children }) => {
  return (
    <SearchProvider>
      <AuthProvider>{children}</AuthProvider>
    </SearchProvider>
  );
};

export default Provider;
