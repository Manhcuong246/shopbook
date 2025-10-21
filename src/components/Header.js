import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>
              <i className="fas fa-book"></i> ShopBook
            </h1>
          </Link>

          <nav className="d-flex align-items-center gap-3">
            <Link to="/books" style={{ color: 'white', textDecoration: 'none' }}>
              <i className="fas fa-book-open"></i> Sách
            </Link>

            {user && (
              <>
                <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
                  <i className="fas fa-shopping-cart"></i> Giỏ hàng
                  {getCartItemCount() > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#ff4757',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getCartItemCount()}
                    </span>
                  )}
                </Link>

                {user.role === 'customer' && (
                  <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="fas fa-history"></i> Đơn hàng
                  </Link>
                )}

                {user.role === 'employee' && (
                  <Link to="/employee" style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="fas fa-users"></i> Quản lý
                  </Link>
                )}

                {user.role === 'admin' && (
                  <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="fas fa-cog"></i> Admin
                  </Link>
                )}
              </>
            )}

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: '0.9rem' }}>
                  {getRoleDisplayName(user.role)} - {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                  style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                >
                  <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt"></i> Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-success">
                  <i className="fas fa-user-plus"></i> Đăng ký
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

