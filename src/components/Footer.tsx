
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sce-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 sce-logo">SCE FOUNDATION</h3>
            <p className="text-sce-gray">
              Secure. Control. Explore. Фонд SCE занимается задержанием аномалий, их исследованием и контролем.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Документация</h3>
            <ul className="space-y-2">
              <li><Link to="/objects" className="text-sce-gray hover:text-white">Объекты SCE</Link></li>
              <li><Link to="/protocols" className="text-sce-gray hover:text-white">Протоколы содержания</Link></li>
              <li><Link to="/personnel" className="text-sce-gray hover:text-white">Персонал</Link></li>
              <li><Link to="/news" className="text-sce-gray hover:text-white">Новости Фонда</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Правовая информация</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sce-gray hover:text-white">Условия использования</Link></li>
              <li><Link to="/privacy" className="text-sce-gray hover:text-white">Политика конфиденциальности</Link></li>
              <li><Link to="/about" className="text-sce-gray hover:text-white">О Фонде</Link></li>
              <li><Link to="/contact" className="text-sce-gray hover:text-white">Связаться с нами</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-sce-darkGray text-center">
          <p className="text-sce-gray">
            &copy; {new Date().getFullYear()} SCE Foundation. Все права защищены. 
            <span className="block mt-2 text-xs">
              Этот сайт содержит вымышленные материалы и предназначен только для развлекательных целей.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
