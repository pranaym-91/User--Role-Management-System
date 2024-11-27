import React from 'react';
import './App.css';
import UserManagement from './components/UserManagement';  // Importing the User Management component
import RoleManagement from './components/RoleManagement';  // Importing the Role Management component

function App() {
  return (
    <div className="App">
      <h1><b>User and Role Management System</b></h1>

      <div className="management-sections">
        {/* User Management Section */}
        <section className="user-management-section">
          <h2>User Management</h2>
          <UserManagement />
        </section>

        {/* Role Management Section */}
        <section className="role-management-section">
          <h2>Role Management</h2>
          <RoleManagement />
        </section>
      </div>
    </div>
  );
}

export default App;
