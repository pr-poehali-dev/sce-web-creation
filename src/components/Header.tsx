
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-sce-red text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold sce-logo tracking-wider">
              SCE FOUNDATION
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/objects" className="hover:text-sce-lightGray font-medium">Объекты SCE</Link>
            <Link to="/protocols" className="hover:text-sce-lightGray font-medium">Протоколы</Link>
            <Link to="/personnel" className="hover:text-sce-lightGray font-medium">Персонал</Link>
            <Link to="/news" className="hover:text-sce-lightGray font-medium">Новости</Link>
            <Link to="/about" className="hover:text-sce-lightGray font-medium">О Фонде</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="hover:text-sce-lightGray">
                  <span className="font-medium">{user.username}</span>
                  {user.accessLevel === 5 && (
                    <span className="ml-2 bg-sce-black text-white px-2 py-0.5 rounded text-xs">
                      Уровень 5
                    </span>
                  )}
                </Link>
                {user.accessLevel === 5 && (
                  <Link to="/admin" className="hover:text-sce-lightGray">
                    Админ-панель
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  className="bg-sce-darkRed border-white text-white hover:bg-sce-red"
                  onClick={logout}
                >
                  Выход
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-sce-darkRed">
                    Вход
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-sce-darkRed text-white hover:bg-sce-black">
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
