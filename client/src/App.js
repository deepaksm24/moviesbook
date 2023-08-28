import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import ProtecdRoute from "./components/protecdRoute";
import { useSelector } from "react-redux";
import LoaderComp from "./loaders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import TheatresforMovie from "./pages/TheatreforMovies";
import BookShow from "./pages/BookShow";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && (
        <div className="loaderparent">
          <div className="loader">
            <LoaderComp />
          </div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtecdRoute>
                <Home />
              </ProtecdRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtecdRoute>
                <TheatresforMovie />
              </ProtecdRoute>
            }
          />
          <Route
            path="movie/:ab/book-show/:id"
            element={
              <ProtecdRoute>
                <BookShow/>
              </ProtecdRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtecdRoute>
                <Profile />
              </ProtecdRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtecdRoute>
                <Admin />
              </ProtecdRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
