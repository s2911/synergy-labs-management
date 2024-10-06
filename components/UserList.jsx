import React, { useState, useEffect } from 'react';
import sampleUsers from './sampleUsers'; 
import UserForm from './UserForm'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching users
    setUsers(sampleUsers);
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <h1>Synergy Labs User Management Gurgaon, Haryana</h1>
      <button onClick={() => { setIsFormOpen(true); setSelectedUser(null); }}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <UserForm 
          user={selectedUser} 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleAddUser} 
        />
      )}
    </div>
  );
};

export default UserList;
