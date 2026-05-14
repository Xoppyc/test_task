import { Route, Routes } from "react-router"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/authContext"
import SignupPage from "./pages/signup/SignupPage";
import BooksPage from "./pages/books/BooksPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  const user = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/books" element={
          <ProtectedRoute user={user.user} >
            <BooksPage />
          </ProtectedRoute>
        } />
        <Route path="/books/:id" element={
          <ProtectedRoute user={user.user} >
            <></>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute user={user.user} adminOnly={true}>
            <></>
          </ProtectedRoute>
        } />
        <Route path="/users/:id" element={
          <ProtectedRoute user={user.user} adminOnly={true}>
            <></>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
