import React, { useState } from 'react';
import './RoleManagement.css';

const initialRoles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'User', permissions: ['Read'] },
];

const RoleManagement = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({ Read: false, Write: false, Delete: false });

  const handleSaveRole = () => {
    if (currentRole) {
      const updatedRoles = roles.map(role => 
        role.id === currentRole.id ? { ...role, name: roleName, permissions: Object.keys(permissions).filter(perm => permissions[perm]) } : role
      );
      setRoles(updatedRoles);
    } else {
      setRoles([ 
        ...roles, 
        { id: roles.length + 1, name: roleName, permissions: Object.keys(permissions).filter(perm => permissions[perm]) } 
      ]);
    }
    setModalVisible(false);
    resetForm();
  };

  const handlePermissionChange = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };

  const handleEditRole = (role) => {
    setRoleName(role.name);
    setPermissions({
      Read: role.permissions.includes('Read'),
      Write: role.permissions.includes('Write'),
      Delete: role.permissions.includes('Delete'),
    });
    setCurrentRole(role);
    setModalVisible(true);
  };

  const handleDeleteRole = (roleId) => {
    const updatedRoles = roles.filter(role => role.id !== roleId);
    setRoles(updatedRoles);
  };

  const resetForm = () => {
    setRoleName('');
    setPermissions({ Read: false, Write: false, Delete: false });
    setCurrentRole(null);
  };

  return (
    <div className="role-management-container">
      <button className="btn-add" onClick={() => setModalVisible(true)}>Add Role</button>
      <table className="role-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditRole(role)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{currentRole ? 'Edit Role' : 'Add Role'}</h3>
            <label>Role Name:</label>
            <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            <label>Permissions:</label>
            <div className="permissions">
              <label>
                <input type="checkbox" name="Read" checked={permissions.Read} onChange={handlePermissionChange} /> Read
              </label>
              <label>
                <input type="checkbox" name="Write" checked={permissions.Write} onChange={handlePermissionChange} /> Write
              </label>
              <label>
                <input type="checkbox" name="Delete" checked={permissions.Delete} onChange={handlePermissionChange} /> Delete
              </label>
            </div>
            <div className="popup-actions">
              <button className="btn-cancel" onClick={() => setModalVisible(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveRole}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
