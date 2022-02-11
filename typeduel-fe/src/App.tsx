import { ReactLocation, Route, Router } from "react-location";
import Dual from "./pages/Dual";
import Main from "./pages/Main";

const reactLocation = new ReactLocation();

const routes: Route[] = [
  { path: "/", element: <Main /> },
  { path: "/dual/:enemy", element: <Dual /> },
];

function App() {
  return (
    <div className="container mx-auto px-4">
      <Router location={reactLocation} routes={routes} />
    </div>
  );
}

export default App;
