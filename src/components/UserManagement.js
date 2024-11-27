import React, { useState } from 'react';
import './UserManagement.css';

// Mock Data for users
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [status, setStatus] = useState('Active');

  // Function to handle adding a new user
  const handleAddUser = () => {
    setUsers([
      ...users,
      { id: users.length + 1, name, email, role, status },
    ]);
    closeModal();
  };

  // Function to handle editing an existing user
  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setCurrentUser(user);
    setModalVisible(true);
  };

  // Function to save edited user data
  const handleSaveUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? { ...user, name, email, role, status } : user
    );
    setUsers(updatedUsers);
    closeModal();
  };

  // Function to delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Close modal and reset the form fields
  const closeModal = () => {
    setModalVisible(false);
    setName('');
    setEmail('');
    setRole('User');
    setStatus('Active');
    setCurrentUser(null); // Reset currentUser as well
  };

  return (
    <div className="user-management-container">
      <button className="btn-add" onClick={() => setModalVisible(true)}>Add User</button>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{currentUser ? 'Edit User' : 'Add User'}</h3>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="popup-actions">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={currentUser ? handleSaveUser : handleAddUser}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
