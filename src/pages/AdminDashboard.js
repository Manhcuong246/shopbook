import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { books, addBook, updateBook, deleteBook, importBooksFromExcel, orders } = useCart();
  const [activeTab, setActiveTab] = useState('books');
  const [editingBook, setEditingBook] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importMethod, setImportMethod] = useState('paste'); // 'paste', 'file', 'excel'

  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    discount: '',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center'
  });

  const handleBookSubmit = (e) => {
    e.preventDefault();
    
    const bookData = {
      ...bookForm,
      price: parseInt(bookForm.price),
      stock: parseInt(bookForm.stock),
      discount: parseInt(bookForm.discount)
    };

    if (editingBook) {
      updateBook(editingBook.id, bookData);
    } else {
      addBook(bookData);
    }

    setEditingBook(null);
    setBookForm({
      title: '',
      author: '',
      price: '',
      description: '',
      category: '',
      stock: '',
      discount: '',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center'
    });
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setBookForm({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      description: book.description,
      category: book.category,
      stock: book.stock.toString(),
      discount: book.discount.toString(),
      image: book.image
    });
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      deleteBook(bookId);
    }
  };

  const handleImportBooks = () => {
    try {
      const booksData = JSON.parse(importData);
      if (Array.isArray(booksData)) {
        importBooksFromExcel(booksData);
        setShowImportModal(false);
        setImportData('');
        setImportMethod('paste');
        alert('Nhập sách thành công!');
      } else {
        alert('Dữ liệu không hợp lệ!');
      }
    } catch (error) {
      alert('Lỗi định dạng JSON!');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          
          if (importMethod === 'file') {
            // JSON file
            setImportData(content);
            JSON.parse(content); // Validate JSON
          } else if (importMethod === 'excel') {
            // CSV/Excel file
            const csvData = parseCSV(content);
            const jsonData = convertCSVToJSON(csvData);
            setImportData(JSON.stringify(jsonData, null, 2));
          }
        } catch (error) {
          alert(`File không phải định dạng ${importMethod === 'file' ? 'JSON' : 'CSV'} hợp lệ!`);
          setImportData('');
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }
    
    return data;
  };

  const convertCSVToJSON = (csvData) => {
    return csvData.map(row => ({
      title: row.title || row.TenSach || '',
      author: row.author || row.TacGia || '',
      price: parseInt(row.price || row.Gia || 0),
      description: row.description || row.MoTa || '',
      category: row.category || row.DanhMuc || '',
      stock: parseInt(row.stock || row.TonKho || 0),
      discount: parseInt(row.discount || row.GiamGia || 0),
      image: row.image || row.HinhAnh || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center'
    }));
  };

  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i className="fas fa-cog"></i> Bảng điều khiển Admin
          </h1>
          <div>
            <span className="badge badge-info">
              👑 Admin: {user?.name}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card mb-4">
          <div className="d-flex gap-2">
            <button
              onClick={() => setActiveTab('books')}
              className={`btn ${activeTab === 'books' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <i className="fas fa-book"></i> Quản lý sách
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <i className="fas fa-shopping-cart"></i> Đơn hàng
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <i className="fas fa-users"></i> Người dùng
            </button>
          </div>
        </div>

        {/* Books Management */}
        {activeTab === 'books' && (
          <div>
            {/* Stats */}
            <div className="grid grid-4 mb-4">
              <div className="card text-center">
                <h3 style={{ color: '#28a745' }}>{books.length}</h3>
                <p>Tổng sách</p>
              </div>
              <div className="card text-center">
                <h3 style={{ color: '#007bff' }}>
                  {books.reduce((total, book) => total + book.stock, 0)}
                </h3>
                <p>Tổng tồn kho</p>
              </div>
              <div className="card text-center">
                <h3 style={{ color: '#ffc107' }}>
                  {books.filter(book => book.stock < 10).length}
                </h3>
                <p>Sắp hết hàng</p>
              </div>
              <div className="card text-center">
                <h3 style={{ color: '#dc3545' }}>
                  {books.filter(book => book.stock === 0).length}
                </h3>
                <p>Hết hàng</p>
              </div>
            </div>

            {/* Book Management */}
            <div className="card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Quản lý sách</h3>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => setEditingBook({})}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-plus"></i> Thêm sách
                  </button>
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="btn btn-success"
                  >
                    <i className="fas fa-file-import"></i> Nhập từ Excel/JSON
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Hình ảnh</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Tên sách</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Tác giả</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Giá</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Tồn kho</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Giảm giá</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map(book => (
                      <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>
                          <img
                            src={book.image}
                            alt={book.title}
                            style={{ width: '50px', height: '60px', objectFit: 'cover' }}
                          />
                        </td>
                        <td style={{ padding: '12px' }}>{book.title}</td>
                        <td style={{ padding: '12px' }}>{book.author}</td>
                        <td style={{ padding: '12px' }}>{book.price.toLocaleString()}đ</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${book.stock > 10 ? 'badge-success' : book.stock > 0 ? 'badge-warning' : 'badge-danger'}`}>
                            {book.stock}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>{book.discount}%</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              onClick={() => handleEditBook(book)}
                              className="btn btn-warning"
                              style={{ padding: '5px 10px' }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
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
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div>
            <div className="card">
              <h3 className="mb-3">Quản lý đơn hàng</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Mã đơn</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Khách hàng</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Tổng tiền</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Trạng thái</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Ngày tạo</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>#{order.id}</td>
                        <td style={{ padding: '12px' }}>{order.customerInfo.name}</td>
                        <td style={{ padding: '12px' }}>{order.total.toLocaleString()}đ</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${
                            order.status === 'pending' ? 'badge-warning' :
                            order.status === 'processing' ? 'badge-info' :
                            order.status === 'delivered' ? 'badge-success' :
                            'badge-danger'
                          }`}>
                            {order.status === 'pending' ? 'Chờ xử lý' :
                             order.status === 'processing' ? 'Đang xử lý' :
                             order.status === 'delivered' ? 'Đã giao' :
                             'Đã hủy'}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button className="btn btn-primary" style={{ padding: '5px 10px' }}>
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div>
            <div className="card">
              <h3 className="mb-3">Quản lý người dùng</h3>
              <p>Chức năng quản lý người dùng chi tiết sẽ được implement trong phiên bản nâng cao.</p>
              <p>Hiện tại có thể sử dụng trang quản lý của nhân viên.</p>
              <a href="/employee" className="btn btn-primary">
                <i className="fas fa-users"></i> Chuyển đến quản lý người dùng
              </a>
            </div>
          </div>
        )}

        {/* Book Form Modal */}
        {editingBook && (
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
            <div className="card" style={{ width: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h3 className="mb-3">
                {editingBook.id ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
              </h3>

              <form onSubmit={handleBookSubmit}>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label>Tên sách:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bookForm.title}
                      onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tác giả:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bookForm.author}
                      onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Giá (đ):</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bookForm.price}
                      onChange={(e) => setBookForm({...bookForm, price: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Danh mục:</label>
                    <select
                      className="form-control"
                      value={bookForm.category}
                      onChange={(e) => setBookForm({...bookForm, category: e.target.value})}
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="new">+ Thêm danh mục mới</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Tồn kho:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bookForm.stock}
                      onChange={(e) => setBookForm({...bookForm, stock: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Giảm giá (%):</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bookForm.discount}
                      onChange={(e) => setBookForm({...bookForm, discount: e.target.value})}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả:</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={bookForm.description}
                    onChange={(e) => setBookForm({...bookForm, description: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>URL hình ảnh:</label>
                  <input
                    type="url"
                    className="form-control"
                    value={bookForm.image}
                    onChange={(e) => setBookForm({...bookForm, image: e.target.value})}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-save"></i> Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-times"></i> Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
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
            <div className="card" style={{ width: '700px', maxHeight: '80vh' }}>
              <h3 className="mb-3">
                <i className="fas fa-file-import"></i> Nhập sách từ JSON/Excel
              </h3>
              
              {/* Import Method Selection */}
              <div className="mb-3">
                <label className="mb-2"><strong>Chọn phương thức nhập:</strong></label>
                <div className="grid grid-3">
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <input
                      type="radio"
                      name="importMethod"
                      value="paste"
                      checked={importMethod === 'paste'}
                      onChange={(e) => setImportMethod(e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    <div>
                      <i className="fas fa-paste" style={{ fontSize: '1.2rem', color: '#007bff' }}></i>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Dán JSON</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Copy/paste trực tiếp</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <input
                      type="radio"
                      name="importMethod"
                      value="file"
                      checked={importMethod === 'file'}
                      onChange={(e) => setImportMethod(e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    <div>
                      <i className="fas fa-file-code" style={{ fontSize: '1.2rem', color: '#28a745' }}></i>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>File JSON</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Upload file .json</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <input
                      type="radio"
                      name="importMethod"
                      value="excel"
                      checked={importMethod === 'excel'}
                      onChange={(e) => setImportMethod(e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    <div>
                      <i className="fas fa-file-excel" style={{ fontSize: '1.2rem', color: '#ffc107' }}></i>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Excel/CSV</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Upload file .csv</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* File Upload Section */}
              {(importMethod === 'file' || importMethod === 'excel') && (
                <div className="form-group mb-3">
                  <label>
                    Chọn file {importMethod === 'file' ? 'JSON' : 'CSV/Excel'}:
                  </label>
                  <input
                    type="file"
                    accept={importMethod === 'file' ? '.json' : '.csv,.xlsx,.xls'}
                    onChange={handleFileUpload}
                    className="form-control"
                    style={{ padding: '8px' }}
                  />
                  <small className="text-muted">
                    <i className="fas fa-info-circle"></i> 
                    {importMethod === 'file' 
                      ? ' Chỉ chấp nhận file .json' 
                      : ' Chấp nhận file .csv, .xlsx, .xls'
                    }
                  </small>
                  {importMethod === 'excel' && (
                    <div style={{ marginTop: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                      <strong>📋 Định dạng CSV mẫu:</strong>
                      <pre style={{ fontSize: '12px', margin: '5px 0' }}>
{`title,author,price,description,category,stock,discount,image
"Tên sách","Tác giả",150000,"Mô tả sách","Danh mục",50,10,"URL hình ảnh"`}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* JSON Data Input */}
              <div className="form-group">
                <label>Dữ liệu JSON:</label>
                <textarea
                  className="form-control"
                  rows="10"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder='[
  {
    "title": "Tên sách",
    "author": "Tác giả",
    "price": 100000,
    "description": "Mô tả sách",
    "category": "Danh mục",
    "stock": 50,
    "discount": 10,
    "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center"
  }
]'
                  disabled={importMethod === 'file' && !importData}
                />
                {importMethod === 'paste' && (
                  <small className="text-muted">
                    <i className="fas fa-lightbulb"></i> Tip: Bạn có thể copy từ file sample-books.json
                  </small>
                )}
              </div>


              <div className="d-flex gap-2">
                <button 
                  onClick={handleImportBooks} 
                  className="btn btn-success"
                  disabled={!importData}
                >
                  <i className="fas fa-upload"></i> Nhập dữ liệu
                </button>
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportData('');
                    setImportMethod('paste');
                  }}
                  className="btn btn-secondary"
                >
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

export default AdminDashboard;
