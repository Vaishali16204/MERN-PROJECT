import React, { useEffect, useState } from "react";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: "DELETE",
      });

      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  
  const handleBlock = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/users/block/${id}`, {
        method: "PUT",
      });

      fetchUsers();
    } catch (err) {
      console.log("Block error:", err);
    }
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>

      <input
        type="text"
        placeholder="Search by email..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Joined On</th>
            <th>Last Active</th>
            <th>Total Orders</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "active"
                        : user.status === "Blocked"
                        ? "blocked"
                        : "inactive"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  {user.lastActive
                    ? new Date(user.lastActive).toLocaleString()
                    : "N/A"}
                </td>

                <td>{user.orders ?? 0}</td>

                <td>
                  <button
                    className="block-btn"
                    onClick={() => handleBlock(user._id)}
                  >
                    {user.status === "Blocked" ? "Unblock" : "Block"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;