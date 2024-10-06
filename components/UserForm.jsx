import React, { useState, useEffect } from 'react';
import './UserForm.css'; 

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: '',
        email: '',
        username: 'USER-' + Math.random().toString(36).substring(7),
        phone: '',
        address: { street: '', city: '' },
        company: { name: '' },
        website: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address')) {
      setFormData({ ...formData, address: { ...formData.address, [name.split('.')[1]]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const simulatedApiResponse = { ...formData, id: user ? user.id : Date.now() };
    onSubmit(simulatedApiResponse);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="user-form">
        <h1 className="form-title">{user ? 'Edit User' : 'Create User'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              minLength={3} 
              placeholder="Enter full name" 
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              type="email" 
              placeholder="Enter email address" 
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input 
              name="username" 
              value={formData.username} 
              readOnly 
              placeholder="Auto-generated" 
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="Enter phone number" 
            />
          </div>
          <div className="form-group">
            <label>Address Street:</label>
            <input 
              name="address.street" 
              value={formData.address.street} 
              onChange={handleChange} 
              required 
              placeholder="Enter street address" 
            />
          </div>
          <div className="form-group">
            <label>Address City:</label>
            <input 
              name="address.city" 
              value={formData.address.city} 
              onChange={handleChange} 
              required 
              placeholder="Enter city" 
            />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input 
              name="company.name" 
              value={formData.company.name} 
              onChange={handleChange} 
              placeholder="Enter company name (optional)" 
            />
          </div>
          <div className="form-group">
            <label>Website:</label>
            <input 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              placeholder="Enter website URL (optional)" 
            />
          </div>
          <div className="form-footer">
            <button type="button" className="exit-button" onClick={onClose}>Exit</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
