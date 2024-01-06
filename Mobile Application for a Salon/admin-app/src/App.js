import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Employee from './pages/Employee';
import Productlist from './pages/Productlist';
import Pricebook from './pages/Pricebook';
import Orders from './pages/Orders';
import Appointment from './pages/Appointment';
import Addproduct from './pages/Addproduct';
import Calen from './pages/Calen';
import Customers from './pages/Customers';
import Haircut from './pages/Haircut';
import Facial from './pages/Facial';
import Makeup from './pages/Makeup';
import Bridal from './pages/Bridal';
import AddOffer from './pages/AddOffer';
import OfferList from './pages/OfferList';
import AddAppoinment from './pages/AddAppoinment';
import AddSlots from './pages/AddSlots';
import Chat from './pages/Chat';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="price-book" element={<Pricebook />} />
          <Route path="orders" element={<Orders />} />
          <Route path="chat" element={<Chat />} />
          <Route path="customer-appointment" element={<Appointment />} />
          <Route path="add-appointment" element={<AddAppoinment />} />
          <Route path="add-slot" element={<AddSlots />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="offer" element={<AddOffer />} />
          <Route path="Offer-list" element={<OfferList />} />
          <Route path="calen" element={<Calen />} />
          <Route path="customers" element={<Customers />} />
          <Route path="add-haircut" element={<Haircut />} />
          <Route path="facial" element={<Facial />} />
          <Route path="makeup" element={<Makeup />} />
          <Route path="bridal" element={<Bridal />} />
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
