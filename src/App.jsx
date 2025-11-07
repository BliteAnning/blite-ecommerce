import Header from "./components/header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Footer from "./components/footer"
import Login from "./pages/login"
import { ForgotPassword } from "./pages/forgotPassword"
import { Signup } from "./pages/signup"
import { Toaster } from 'react-hot-toast'
import AdminPanel from "./pages/adminPanel"
import AllUsers from "./pages/AllUsers"
import AllProducts from "./pages/AllProducts"
import CategoryProducts from "./pages/CategoryProducts"
import ProductDetails from "./pages/ProductDetails"
import ViewCart from "./pages/ViewCart"
import Searchproduct from "./pages/Searchproduct"

function App() {



  return (
    <>
      <Toaster />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product-category/:categoryName" element={<CategoryProducts/>} />
          <Route path="/admin-panel" element={<AdminPanel />}>
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
          <Route path="/cart" element={<ViewCart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Searchproduct />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
