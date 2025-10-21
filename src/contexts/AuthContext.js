import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data cho demo
  const mockUsers = [
    {
      id: 1,
      email: 'admin@shopbook.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin',
      phone: '0123456789',
      address: '123 Admin Street'
    },
    {
      id: 2,
      email: 'employee@shopbook.com',
      password: 'emp123',
      name: 'Nhân viên',
      role: 'employee',
      phone: '0987654321',
      address: '456 Employee Street'
    },
    {
      id: 3,
      email: 'customer@shopbook.com',
      password: 'cus123',
      name: 'Khách hàng',
      role: 'customer',
      phone: '0555123456',
      address: '789 Customer Street'
    }
  ];

  useEffect(() => {
    // Kiểm tra localStorage khi app khởi động
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Không lưu password
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, user: userData };
    } else {
      setLoading(false);
      return { success: false, message: 'Email hoặc mật khẩu không đúng' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Kiểm tra email đã tồn tại
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setLoading(false);
      return { success: false, message: 'Email đã được sử dụng' };
    }
    
    // Tạo user mới
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'customer'
    };
    
    mockUsers.push(newUser);
    
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setLoading(false);
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

