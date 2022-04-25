import { createRoot } from "react-dom/client";

import Main from "./Main";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<Main />);
