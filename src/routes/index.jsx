import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "../pages/Orders";
import PageLayout from "../layout/PageLayout";
import Transactions from "../pages/Transactions";
import CreateOrderForm from "../pages/CreateOrder";

const AltaRoutes = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/transactions/:id" element={<Transactions />} />
          <Route path="/create-order" element={<CreateOrderForm />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
};

export default AltaRoutes;
