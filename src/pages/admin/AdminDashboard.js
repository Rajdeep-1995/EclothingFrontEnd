import React from "react";

import AdminNav from "../../components/nav/AdminNav";
import AdminOrderHistory from "./AdminOrderHistory";

const AdminDashboard = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col">
            <AdminOrderHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
