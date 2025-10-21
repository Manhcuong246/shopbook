import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, getCartTotal, createOrder, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    paymentMethod: 'cod',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = createOrder({
      customerInfo: formData,
      paymentMethod: formData.paymentMethod
    });

    setLoading(false);
    alert('Đặt hàng thành công! Mã đơn hàng: #' + order.id);
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="text-center">
            <h2>Giỏ hàng trống</h2>
            <p>Không có sản phẩm nào để thanh toán.</p>
            <button onClick={() => navigate('/books')} className="btn btn-primary">
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 className="mb-4">
          <i className="fas fa-credit-card"></i> Thanh toán
        </h1>

        <div className="grid grid-2">
          {/* Checkout Form */}
          <div>
            <div className="card">
              <h3 className="mb-3">Thông tin giao hàng</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ giao hàng *</label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phương thức thanh toán *</label>
                  <div>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        style={{ marginRight: '8px' }}
                      />
                      <i className="fas fa-money-bill-wave"></i> Thanh toán khi nhận hàng (COD)
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleChange}
                        style={{ marginRight: '8px' }}
                      />
                      <i className="fas fa-university"></i> Chuyển khoản ngân hàng
                    </label>
                    <label style={{ display: 'block' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        style={{ marginRight: '8px' }}
                      />
                      <i className="fas fa-credit-card"></i> Thẻ tín dụng
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Ghi chú</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Ghi chú thêm cho đơn hàng..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ width: '100%', fontSize: '1.1rem', padding: '12px' }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Đặt hàng
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card">
              <h3 className="mb-3">Đơn hàng của bạn</h3>
              
              {cartItems.map(item => {
                const finalPrice = Math.round(item.price * (1 - item.discount / 100));
                const itemTotal = finalPrice * item.quantity;

                return (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2" style={{ paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {item.author} x {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>
                      {itemTotal.toLocaleString()}đ
                    </div>
                  </div>
                );
              })}

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <span>{getCartTotal().toLocaleString()}đ</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              
              <div className="d-flex justify-content-between" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                <span>Tổng cộng:</span>
                <span>{getCartTotal().toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

