import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      role: 'customer',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      role: 'customer',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0555123456',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      role: 'customer',
      status: 'inactive',
      createdAt: '2024-02-01'
    }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'customer',
    status: 'active'
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      status: user.status
    });
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id ? { ...u, ...formData } : u
      ));
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'customer',
      status: 'active'
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'customer',
      status: 'active'
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin':
        return '👑 Admin';
      case 'employee':
        return '👨‍💼 Nhân viên';
      case 'customer':
        return '👤 Khách hàng';
      default:
        return 'Người dùng';
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      <span className="badge badge-success">Hoạt động</span> : 
      <span className="badge badge-danger">Không hoạt động</span>;
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="fas fa-users"></i> Quản lý người dùng
          </h1>
          <div>
            <span className="badge badge-info">
              👨‍💼 Nhân viên: {user?.name}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-3 mb-4">
          <div className="card text-center">
            <h3 style={{ color: '#28a745' }}>{users.length}</h3>
            <p>Tổng người dùng</p>
          </div>
          <div className="card text-center">
            <h3 style={{ color: '#007bff' }}>
              {users.filter(u => u.status === 'active').length}
            </h3>
            <p>Đang hoạt động</p>
          </div>
          <div className="card text-center">
            <h3 style={{ color: '#6c757d' }}>
              {users.filter(u => u.role === 'customer').length}
            </h3>
            <p>Khách hàng</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Danh sách người dùng</h3>
            <button
              onClick={() => setEditingUser({})}
              className="btn btn-primary"
            >
              <i className="fas fa-plus"></i> Thêm người dùng
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Tên</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Điện thoại</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Vai trò</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Trạng thái</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Ngày tạo</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{user.name}</td>
                    <td style={{ padding: '12px' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>{user.phone}</td>
                    <td style={{ padding: '12px' }}>{getRoleDisplayName(user.role)}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(user.status)}</td>
                    <td style={{ padding: '12px' }}>{user.createdAt}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-warning"
                          style={{ padding: '5px 10px' }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-danger"
                          style={{ padding: '5px 10px' }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit/Add User Modal */}
        {editingUser && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="card" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h3 className="mb-3">
                {editingUser.id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
              </h3>

              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Điện thoại:</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Vai trò:</label>
                <select
                  className="form-control"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="customer">Khách hàng</option>
                  <option value="employee">Nhân viên</option>
                </select>
              </div>

              <div className="form-group">
                <label>Trạng thái:</label>
                <select
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>

              <div className="d-flex gap-2">
                <button onClick={handleSave} className="btn btn-success">
                  <i className="fas fa-save"></i> Lưu
                </button>
                <button onClick={handleCancel} className="btn btn-secondary">
                  <i className="fas fa-times"></i> Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

