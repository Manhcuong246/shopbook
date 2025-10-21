import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Mock data cho sách
  const mockBooks = [
    {
      id: 1,
      title: 'Đắc Nhân Tâm',
      author: 'Dale Carnegie',
      price: 89000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center',
      description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và thuyết phục.',
      category: 'Kỹ năng sống',
      stock: 50,
      discount: 0
    },
    {
      id: 2,
      title: 'Tôi Tài Giỏi, Bạn Cũng Thế',
      author: 'Adam Khoo',
      price: 120000,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center',
      description: 'Phương pháp học tập hiệu quả và phát triển bản thân.',
      category: 'Giáo dục',
      stock: 30,
      discount: 10
    },
    {
      id: 3,
      title: 'Nhà Giả Kim',
      author: 'Paulo Coelho',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center',
      description: 'Câu chuyện về hành trình tìm kiếm kho báu và ý nghĩa cuộc sống.',
      category: 'Văn học',
      stock: 25,
      discount: 5
    },
    {
      id: 4,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&crop=center',
      description: 'Lược sử loài người từ thời tiền sử đến hiện tại.',
      category: 'Lịch sử',
      stock: 20,
      discount: 15
    },
    {
      id: 5,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 110000,
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop&crop=center',
      description: 'Nghệ thuật xây dựng thói quen tốt và loại bỏ thói quen xấu.',
      category: 'Phát triển bản thân',
      stock: 40,
      discount: 8
    },
    {
      id: 6,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 180000,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&crop=center',
      description: 'Tiểu thuyết khoa học viễn tưởng kinh điển.',
      category: 'Khoa học viễn tưởng',
      stock: 15,
      discount: 12
    },
    {
      id: 7,
      title: '7 Thói Quen Của Người Thành Đạt',
      author: 'Stephen Covey',
      price: 135000,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center',
      description: 'Những nguyên tắc cơ bản để xây dựng tính cách và đạt được thành công.',
      category: 'Phát triển bản thân',
      stock: 35,
      discount: 7
    },
    {
      id: 8,
      title: 'Tư Duy Nhanh Và Chậm',
      author: 'Daniel Kahneman',
      price: 165000,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center',
      description: 'Khám phá cách bộ não con người đưa ra quyết định.',
      category: 'Khoa học',
      stock: 22,
      discount: 18
    },
    {
      id: 9,
      title: 'Nghệ Thuật Chiến Tranh',
      author: 'Tôn Tử',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=center',
      description: 'Binh pháp cổ đại với những bài học về chiến lược và lãnh đạo.',
      category: 'Kinh doanh',
      stock: 28,
      discount: 5
    },
    {
      id: 10,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      price: 125000,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&crop=center',
      description: 'Những bài học về tài chính cá nhân và đầu tư.',
      category: 'Tài chính',
      stock: 45,
      discount: 12
    }
  ];

  const [books, setBooks] = useState(mockBooks);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save orders to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (book, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === book.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...book, quantity }]);
    }
  };

  const removeFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      items: [...cartItems],
      total: getCartTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setOrders([...orders, newOrder]);
    clearCart();
    
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addBook = (bookData) => {
    const newBook = {
      id: Date.now(),
      ...bookData,
      stock: bookData.stock || 0,
      discount: bookData.discount || 0
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (bookId, updatedData) => {
    setBooks(books.map(book =>
      book.id === bookId ? { ...book, ...updatedData } : book
    ));
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const importBooksFromExcel = (booksData) => {
    const newBooks = booksData.map((book, index) => ({
      id: Date.now() + index,
      ...book,
      stock: book.stock || 0,
      discount: book.discount || 0
    }));
    setBooks([...books, ...newBooks]);
  };

  const value = {
    books,
    cartItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    createOrder,
    updateOrderStatus,
    addBook,
    updateBook,
    deleteBook,
    importBooksFromExcel
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
