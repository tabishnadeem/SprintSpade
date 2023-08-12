import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import UsernameModal from "./components/UsernameModal";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Provider } from "react-redux";
import { store } from "./store";
import InvalidUUIDPage from "./pages/InvalidUUIDPage";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<UsernameModal visible />} />
          <Route path="/room/:uuidParam" element={<GamePage />} />
          <Route path="/invalid" element={<InvalidUUIDPage />} />
        </Routes>
      </Provider>
    </>
  );
}

// TODO:
// 1. Need to think of a way to split incoming data into upper list and lower list
// 2. Modal component is visible even after coming from it

export default App;
