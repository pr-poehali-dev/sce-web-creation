
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-sce-red text-white p-4 mb-6 inline-flex rounded-md">
              <h1 className="text-4xl font-bold">404</h1>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Файл не найден</h2>
            
            <div className="mb-8 p-4 border-2 border-sce-red bg-sce-lightGray">
              <p className="text-lg font-bold mb-2">УВЕДОМЛЕНИЕ СЛУЖБЫ БЕЗОПАСНОСТИ</p>
              <p>Запрашиваемый вами документ не найден в базе данных Фонда SCE.</p>
              <p className="mt-2">Возможные причины:</p>
              <ul className="list-disc list-inside text-left mt-2">
                <li>Документ был перемещен или удален</li>
                <li>У вас недостаточный уровень доступа</li>
                <li>Документ засекречен по приказу О5</li>
                <li>Вы ввели неверный URL</li>
              </ul>
            </div>
            
            <p className="mb-6">Вернитесь на главную страницу или обратитесь к администратору системы, если считаете, что произошла ошибка.</p>
            
            <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
