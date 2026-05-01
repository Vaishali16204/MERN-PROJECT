import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,} from "recharts";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data || []));

    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data || []));

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data || []));
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce( (sum, order) => sum + Number(order.total || 0), 0 );
  const ordersData = [];
  const revenueData = [];

  orders.forEach((order) => {
    if (!order.createdAt) return;
    const day = new Date(order.createdAt).toLocaleString("default", {weekday: "short", });
    const orderDay = ordersData.find((item) => item.name === day);
    if (orderDay) orderDay.orders += 1; else ordersData.push({ name: day, orders: 1 });
    const revenueDay = revenueData.find((item) => item.name === day);
    if (revenueDay) revenueDay.revenue += Number(order.total || 0); else revenueData.push({ name: day, revenue: Number(order.total || 0) });
  });

  const pieData = [
    { name: "Users", value: users.length },
    { name: "Products", value: products.length },
    { name: "Orders", value: orders.length },
  ];
  const COLORS = ["purple", "pink", "blue"];

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Admin</h2>
        <button onClick={() => navigate("/admin-dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/add-product")}>Add Product</button>
        <button onClick={() => navigate("/manage-products")}>Products</button>
        <button onClick={() => navigate("/manage-users")}>Users</button>
        <button onClick={() => navigate("/manage-orders")}>Orders</button>
      </div>

      <div className="main">
        <h1>Dashboard</h1>
        <div className="cards">
          <div className="card orders"><h3>Orders</h3> <p>{totalOrders}</p></div>
          <div className="card revenue"><h3>Revenue</h3><p>₹{totalRevenue}</p> </div>
          <div className="card users"> <h3>Users</h3> <p>{users.length}</p></div>
          <div className="card products"><h3>Products</h3><p>{products.length}</p></div>
        </div>

        <div className="charts">
          <div className="chart-box">
          <h3>Weekly Orders</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="yellow" radius={[8, 8, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
          <h3>Store Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData}dataKey="value"outerRadius={100}label>
              {pieData.map((entry, index) => (<Cell key={`cell-${index}`}fill={COLORS[index % COLORS.length]}/>))}
            </Pie>
            <Tooltip />
          </PieChart>
          </ResponsiveContainer>
          </div>
        </div>

        <div className="charts">
          <div className="chart-box">
          <h3>Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone"dataKey="revenue"stroke="#f72585"strokeWidth={4} />
          </LineChart>
          </ResponsiveContainer>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box stat1">
            <h4>Active Users</h4>
            <p>{users.filter((u) => u.status === "Active").length}</p>
          </div>
          <div className="stat-box stat2">
            <h4>Blocked Users</h4>
            <p>{users.filter((u) => u.status === "Blocked").length}</p>
          </div>
          <div className="stat-box stat3">
            <h4>Avg Revenue</h4>
            <p>₹{totalOrders  ? Math.round(totalRevenue / totalOrders)  : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;