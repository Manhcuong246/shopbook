import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const BookList = () => {
  const { books, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const categories = [...new Set(books.map(book => book.category))];

  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

  const handleAddToCart = (book) => {
    addToCart(book);
    alert('Đã thêm sách vào giỏ hàng!');
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 className="mb-4">
          <i className="fas fa-book-open"></i> Danh sách sách
        </h1>

        {/* Filters */}
        <div className="card mb-4">
          <div className="grid grid-3">
            <div className="form-group">
              <label>Tìm kiếm:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm theo tên sách hoặc tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Danh mục:</label>
              <select
                className="form-control"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sắp xếp:</label>
              <select
                className="form-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Tên sách A-Z</option>
                <option value="author">Tác giả A-Z</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-3">
          Tìm thấy {filteredBooks.length} cuốn sách
        </p>

        {/* Books Grid */}
        <div className="grid grid-3">
          {filteredBooks.map(book => (
            <div key={book.id} className="card">
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
              
              <h4 style={{ marginBottom: '0.5rem' }}>{book.title}</h4>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                <i className="fas fa-user"></i> {book.author}
              </p>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <i className="fas fa-tag"></i> {book.category}
              </p>

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
                  <span style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '1.1rem' }}>
                    {book.price.toLocaleString()}đ
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <span className={`badge ${book.stock > 10 ? 'badge-success' : book.stock > 0 ? 'badge-warning' : 'badge-danger'}`}>
                  {book.stock > 0 ? `Còn ${book.stock} cuốn` : 'Hết hàng'}
                </span>
              </div>

              <div className="d-flex gap-2">
                <Link to={`/books/${book.id}`} className="btn btn-primary" style={{ flex: 1 }}>
                  <i className="fas fa-eye"></i> Chi tiết
                </Link>
                <button
                  onClick={() => handleAddToCart(book)}
                  className="btn btn-success"
                  disabled={book.stock === 0}
                  style={{ flex: 1 }}
                >
                  <i className="fas fa-cart-plus"></i> Thêm
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <i className="fas fa-search" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
            <h3>Không tìm thấy sách nào</h3>
            <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;

