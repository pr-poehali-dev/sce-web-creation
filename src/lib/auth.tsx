
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type User = {
  id: string;
  username: string;
  email: string;
  accessLevel: number;
  registered: string;
  isFirstUser: boolean;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  sendVerificationEmail: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

// Создаем контекст авторизации
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Имитация базы данных с хранением в localStorage
const saveUsers = (users: any[]) => {
  localStorage.setItem('sce_users', JSON.stringify(users));
};

const getUsers = (): any[] => {
  const users = localStorage.getItem('sce_users');
  return users ? JSON.parse(users) : [];
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка пользователя при инициализации
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('sce_current_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  // Функция для регистрации
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Получаем всех пользователей
      const users = getUsers();
      
      // Проверяем, существует ли уже пользователь с таким email
      if (users.some(u => u.email === userData.email)) {
        toast.error("Пользователь с такой почтой уже существует");
        return false;
      }
      
      // Проверяем, существует ли уже пользователь с таким username
      if (users.some(u => u.username === userData.username)) {
        toast.error("Пользователь с таким именем уже существует");
        return false;
      }
      
      // Создаем нового пользователя
      const newUser: User = {
        id: crypto.randomUUID(),
        username: userData.username,
        email: userData.email,
        accessLevel: users.length === 0 ? 5 : 1, // Первому пользователю даем максимальный уровень доступа
        registered: new Date().toISOString(),
        isFirstUser: users.length === 0
      };
      
      // Сохраняем пользователя в "базе данных"
      const updatedUsers = [...users, { 
        ...newUser, 
        password: userData.password, // В реальном приложении пароль должен быть хеширован
        verified: false,
        bio: userData.bio || '',
        verificationToken: crypto.randomUUID(),
        pendingApproval: users.length > 0 // Все кроме первого требуют одобрения
      }];
      
      saveUsers(updatedUsers);
      
      // Если это первый пользователь, автоматически авторизуем его
      if (users.length === 0) {
        setUser(newUser);
        localStorage.setItem('sce_current_user', JSON.stringify(newUser));
        toast.success("Регистрация успешна. Вы первый пользователь с полным доступом.");
        return true;
      } else {
        toast.success("Регистрация успешна. Ожидайте подтверждения администратором.");
        return true;
      }
    } catch (error) {
      toast.error("Ошибка при регистрации");
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для входа
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Получаем всех пользователей
      const users = getUsers();
      
      // Находим пользователя с указанным email и паролем
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        toast.error("Неверный email или пароль");
        return false;
      }
      
      if (!foundUser.verified) {
        toast.error("Ваш email еще не подтвержден");
        return false;
      }
      
      if (foundUser.pendingApproval) {
        toast.error("Ваш аккаунт ожидает одобрения администратором");
        return false;
      }
      
      // Создаем объект пользователя (без пароля и других служебных полей)
      const userToStore: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        accessLevel: foundUser.accessLevel,
        registered: foundUser.registered,
        isFirstUser: foundUser.isFirstUser
      };
      
      // Сохраняем пользователя в состоянии и localStorage
      setUser(userToStore);
      localStorage.setItem('sce_current_user', JSON.stringify(userToStore));
      
      toast.success("Вход успешен");
      return true;
    } catch (error) {
      toast.error("Ошибка при входе");
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sce_current_user');
    toast.success("Вы вышли из системы");
  };

  // Функция для отправки письма с подтверждением
  const sendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      // В реальном приложении здесь будет отправка письма
      // В эмуляции - просто устанавливаем пользователя как верифицированного
      
      const users = getUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        toast.error("Пользователь не найден");
        return false;
      }
      
      users[userIndex].verified = true;
      saveUsers(users);
      
      toast.success("Письмо с подтверждением отправлено (эмуляция)");
      return true;
    } catch (error) {
      toast.error("Ошибка при отправке письма");
      console.error(error);
      return false;
    }
  };

  // Функция для проверки токена верификации
  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.verificationToken === token);
      
      if (userIndex === -1) {
        toast.error("Недействительный токен верификации");
        return false;
      }
      
      users[userIndex].verified = true;
      users[userIndex].verificationToken = null;
      saveUsers(users);
      
      toast.success("Email успешно подтвержден");
      return true;
    } catch (error) {
      toast.error("Ошибка при подтверждении email");
      console.error(error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    sendVerificationEmail,
    verifyEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
