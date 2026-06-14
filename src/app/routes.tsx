import { createBrowserRouter } from "react-router";
import { DocumentLibrary } from "./components/DocumentLibrary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DocumentLibrary,
  },
]);
