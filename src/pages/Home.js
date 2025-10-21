import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Home = () => {
  const { books } = useCart();
  const featuredBooks = books.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Chào mừng đến với ShopBook
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Khám phá thế giới tri thức với hàng ngàn cuốn sách hay
          </p>
          <Link to="/books" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
            <i className="fas fa-book-open"></i> Khám phá sách
          </Link>
        </div>
      </section>

      {/* Featured Books */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center mb-4">Sách nổi bật</h2>
          <div className="grid grid-4">
            {featuredBooks.map(book => (
              <div key={book.id} className="card" style={{ textAlign: 'center' }}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}
                />
                <h4 style={{ marginBottom: '0.5rem' }}>{book.title}</h4>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>{book.author}</p>
                <div style={{ marginBottom: '1rem' }}>
                  {book.discount > 0 ? (
                    <div>
                      <span style={{ textDecoration: 'line-through', color: '#999' }}>
                        {book.price.toLocaleString()}đ
                      </span>
                      <span style={{ color: '#e74c3c', fontWeight: 'bold', marginLeft: '10px' }}>
                        {Math.round(book.price * (1 - book.discount / 100)).toLocaleString()}đ
                      </span>
                      <span className="badge badge-danger" style={{ marginLeft: '10px' }}>
                        -{book.discount}%
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {book.price.toLocaleString()}đ
                    </span>
                  )}
                </div>
                <Link to={`/books/${book.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/books" className="btn btn-secondary">
              Xem tất cả sách
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center mb-4">Tại sao chọn ShopBook?</h2>
          <div className="grid grid-3">
            <div className="text-center">
              <div style={{
                fontSize: '3rem',
                color: '#667eea',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h4>Giao hàng nhanh</h4>
              <p>Giao hàng trong 24h tại TP.HCM và Hà Nội</p>
            </div>
            <div className="text-center">
              <div style={{
                fontSize: '3rem',
                color: '#667eea',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Bảo hành chất lượng</h4>
              <p>Đổi trả miễn phí trong 7 ngày nếu sách có lỗi</p>
            </div>
            <div className="text-center">
              <div style={{
                fontSize: '3rem',
                color: '#667eea',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-percentage"></i>
              </div>
              <h4>Giá tốt nhất</h4>
              <p>Giá cạnh tranh và nhiều chương trình khuyến mãi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

