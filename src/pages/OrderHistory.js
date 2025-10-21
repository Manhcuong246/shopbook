import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const OrderHistory = () => {
  const { orders } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-warning">Chờ xử lý</span>;
      case 'processing':
        return <span className="badge badge-info">Đang xử lý</span>;
      case 'shipped':
        return <span className="badge badge-info">Đã gửi</span>;
      case 'delivered':
        return <span className="badge badge-success">Đã giao</span>;
      case 'cancelled':
        return <span className="badge badge-danger">Đã hủy</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <i className="fas fa-history" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
            <h2>Chưa có đơn hàng nào</h2>
            <p>Hãy mua sắm và tạo đơn hàng đầu tiên của bạn</p>
            <a href="/books" className="btn btn-primary">
              <i className="fas fa-book-open"></i> Khám phá sách
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 className="mb-4">
          <i className="fas fa-history"></i> Lịch sử đơn hàng
        </h1>

        <div className="grid grid-2">
          {/* Orders List */}
          <div>
            {orders.map(order => (
              <div key={order.id} className="card mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4>Đơn hàng #{order.id}</h4>
                    <p style={{ color: '#666', margin: 0 }}>
                      <i className="fas fa-calendar"></i> {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <div style={{ fontWeight: 'bold', color: '#e74c3c', marginTop: '5px' }}>
                      {order.total.toLocaleString()}đ
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p style={{ margin: 0 }}>
                    <strong>Giao đến:</strong> {order.customerInfo.name} - {order.customerInfo.phone}
                  </p>
                  <p style={{ margin: 0, color: '#666' }}>
                    {order.customerInfo.address}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fas fa-box"></i> {order.items.length} sản phẩm
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-eye"></i> Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div>
            {selectedOrder ? (
              <div className="card" style={{ position: 'sticky', top: '20px' }}>
                <h3 className="mb-3">Chi tiết đơn hàng #{selectedOrder.id}</h3>
                
                <div className="mb-3">
                  <h5>Thông tin khách hàng:</h5>
                  <p><strong>Tên:</strong> {selectedOrder.customerInfo.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                  <p><strong>Điện thoại:</strong> {selectedOrder.customerInfo.phone}</p>
                  <p><strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}</p>
                </div>

                <div className="mb-3">
                  <h5>Sản phẩm:</h5>
                  {selectedOrder.items.map(item => {
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
                </div>

                <div className="mb-3">
                  <h5>Thanh toán:</h5>
                  <p><strong>Phương thức:</strong> {
                    selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' :
                    selectedOrder.paymentMethod === 'bank' ? 'Chuyển khoản ngân hàng' :
                    'Thẻ tín dụng'
                  }</p>
                  <p><strong>Tổng cộng:</strong> {selectedOrder.total.toLocaleString()}đ</p>
                </div>

                {selectedOrder.customerInfo.notes && (
                  <div className="mb-3">
                    <h5>Ghi chú:</h5>
                    <p>{selectedOrder.customerInfo.notes}</p>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-times"></i> Đóng
                  </button>
                </div>
              </div>
            ) : (
              <div className="card text-center" style={{ padding: '3rem 0' }}>
                <i className="fas fa-info-circle" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
                <h4>Chọn đơn hàng</h4>
                <p>Nhấn "Chi tiết" để xem thông tin đơn hàng</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

