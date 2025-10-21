import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="text-center">
            <h2>Không tìm thấy sách</h2>
            <p>Sách bạn tìm kiếm không tồn tại.</p>
            <button onClick={() => navigate('/books')} className="btn btn-primary">
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    alert(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`);
  };

  const finalPrice = Math.round(book.price * (1 - book.discount / 100));

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="grid grid-2">
          {/* Book Image */}
          <div>
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Book Details */}
          <div>
            <h1 style={{ marginBottom: '1rem' }}>{book.title}</h1>
            
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '1rem' }}>
              <i className="fas fa-user"></i> <strong>Tác giả:</strong> {book.author}
            </p>

            <p style={{ color: '#888', marginBottom: '1rem' }}>
              <i className="fas fa-tag"></i> <strong>Danh mục:</strong> {book.category}
            </p>

            <div style={{ marginBottom: '1rem' }}>
              {book.discount > 0 ? (
                <div>
                  <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>
                    {book.price.toLocaleString()}đ
                  </span>
                  <span style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '15px' }}>
                    {finalPrice.toLocaleString()}đ
                  </span>
                  <span className="badge badge-danger" style={{ marginLeft: '15px', fontSize: '1rem' }}>
                    -{book.discount}%
                  </span>
                </div>
              ) : (
                <span style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '1.5rem' }}>
                  {book.price.toLocaleString()}đ
                </span>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span className={`badge ${book.stock > 10 ? 'badge-success' : book.stock > 0 ? 'badge-warning' : 'badge-danger'}`}>
                {book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết hàng'}
              </span>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Mô tả:</h4>
              <p style={{ lineHeight: '1.6' }}>{book.description}</p>
            </div>

            {book.stock > 0 && (
              <div className="card" style={{ background: '#f8f9fa' }}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <label htmlFor="quantity"><strong>Số lượng:</strong></label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={book.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    style={{ width: '80px', padding: '5px', textAlign: 'center' }}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-success"
                    style={{ flex: 1 }}
                  >
                    <i className="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={() => {
                      addToCart(book, quantity);
                      navigate('/cart');
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    <i className="fas fa-shopping-cart"></i> Mua ngay
                  </button>
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => navigate('/books')} className="btn btn-secondary">
                <i className="fas fa-arrow-left"></i> Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

