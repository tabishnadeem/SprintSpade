import { lazy, Suspense } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import UsernameModal from "./components/UsernameModal";
import { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import { Provider } from "react-redux";
import { store } from "./store";
import InvalidUUIDPage from "./pages/InvalidUUIDPage";
import NoInternet from "./pages/NoInternetPage";
import sorryImage from "./assets/sorry.png";
import ErrorBoundary from "./ErrorBoundary";
import LoadingComponent from "./components/LoadingComponent";

const GamePage = lazy(() => import("./pages/GamePage"));

function App() {
  const [isInternetConnectionActive, setIsInternetConnectionActive] = useState(
    navigator.onLine
  );
  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsInternetConnectionActive(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isInternetConnectionActive]);

  useEffect(() => {
    themeChange(false);
    window.localStorage.setItem("theme", "light");
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={isInternetConnectionActive ? <HomePage /> : <NoInternet />}
          />
          <Route
            path="/register"
            element={
              isInternetConnectionActive ? (
                <Suspense fallback={<LoadingComponent />}>
                  <UsernameModal visible />
                </Suspense>
              ) : (
                <NoInternet />
              )
            }
          />
          <Route
            path="/room/:uuidParam"
            element={
              isInternetConnectionActive ? (
                <Suspense fallback={<LoadingComponent />}>
                  <ErrorBoundary>
                    <GamePage />
                  </ErrorBoundary>
                </Suspense>
              ) : (
                <NoInternet />
              )
            }
          />
          <Route
            path="/invalid"
            element={
              isInternetConnectionActive ? <InvalidUUIDPage /> : <NoInternet />
            }
          />
        </Routes>
      </Provider>
      <div
        id="desktop-only"
        className="flex flex-col justify-center text-center items-center h-screen gap-10"
      >
        <img src={sorryImage} alt="sorry-image" width={96} />
        <div className="font-semibold text-2xl">
          Currently, only desktop mode is functional
        </div>
      </div>
    </>
  );
}

export default App;
