import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
    } else {
      updateQuantity(bookId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
            <h2>Giỏ hàng trống</h2>
            <p>Hãy thêm một số sách vào giỏ hàng để tiếp tục mua sắm</p>
            <Link to="/books" className="btn btn-primary">
              <i className="fas fa-book-open"></i> Khám phá sách
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 className="mb-4">
          <i className="fas fa-shopping-cart"></i> Giỏ hàng
        </h1>

        <div className="grid grid-2">
          {/* Cart Items */}
          <div>
            {cartItems.map(item => {
              const finalPrice = Math.round(item.price * (1 - item.discount / 100));
              const itemTotal = finalPrice * item.quantity;

              return (
                <div key={item.id} className="card mb-3">
                  <div className="d-flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                        <i className="fas fa-user"></i> {item.author}
                      </p>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        {item.discount > 0 ? (
                          <div>
                            <span style={{ textDecoration: 'line-through', color: '#999' }}>
                              {item.price.toLocaleString()}đ
                            </span>
                            <span style={{ color: '#e74c3c', fontWeight: 'bold', marginLeft: '10px' }}>
                              {finalPrice.toLocaleString()}đ
                            </span>
                            <span className="badge badge-danger" style={{ marginLeft: '10px' }}>
                              -{item.discount}%
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                            {item.price.toLocaleString()}đ
                          </span>
                        )}
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <label>Số lượng:</label>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="btn btn-secondary"
                          style={{ padding: '5px 10px' }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="btn btn-secondary"
                          style={{ padding: '5px 10px' }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-danger"
                          style={{ marginLeft: 'auto' }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2c3e50' }}>
                        {itemTotal.toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '20px' }}>
              <h3 className="mb-3">Tóm tắt đơn hàng</h3>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Số sản phẩm:</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <span>{getCartTotal().toLocaleString()}đ</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Tổng cộng:</span>
                <span style={{ color: '#e74c3c' }}>{getCartTotal().toLocaleString()}đ</span>
              </div>

              <div className="d-flex gap-2 mb-3">
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <i className="fas fa-credit-card"></i> Thanh toán
                </button>
                <button
                  onClick={clearCart}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              <Link to="/books" className="btn btn-secondary" style={{ width: '100%' }}>
                <i className="fas fa-arrow-left"></i> Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

