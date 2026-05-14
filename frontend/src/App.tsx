import { Route, Routes } from "react-router"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAuth } from "./context/authContext"
import SignupPage from "./pages/signup/SignupPage";
import BooksPage from "./pages/books/BooksPage";
import LoginPage from "./pages/login/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import EditUserPage from "./pages/editUser/EditUserPage";
import BookDetailPage from "./pages/bookDetail/BookDetailPage";
import Layout from "./components/Layout/Layout";

function App() {
  const user = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Layout />}>
          <Route path="/books" element={
            <ProtectedRoute user={user.user} >
              <BooksPage />
            </ProtectedRoute>
          } />
          <Route path="/books/:id" element={
            <ProtectedRoute user={user.user} >
              <BookDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/books/:id/edit" element={
            <ProtectedRoute user={user.user} adminOnly={true}>
              <BookDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute user={user.user} adminOnly={true}>
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="/users/:id" element={
            <ProtectedRoute user={user.user} adminOnly={true}>
              <EditUserPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
