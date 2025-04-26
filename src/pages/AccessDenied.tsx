
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertTriangle } from 'lucide-react';

const AccessDenied = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-sce-red text-white p-4 mb-6 inline-flex rounded-md">
              <AlertTriangle className="h-10 w-10" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
            
            <div className="mb-8 p-4 border-2 border-sce-red bg-sce-lightGray">
              <p className="text-lg font-bold mb-2">УВЕДОМЛЕНИЕ СЛУЖБЫ БЕЗОПАСНОСТИ</p>
              <p>У вас недостаточно прав для доступа к запрошенному разделу.</p>
              <p className="mt-2">Для доступа к данному разделу требуется более высокий уровень допуска.</p>
              <p className="mt-2 text-sce-red font-bold">
                Попытка несанкционированного доступа зарегистрирована.
              </p>
            </div>
            
            <p className="mb-6">Вернитесь на главную страницу или обратитесь к администратору для повышения уровня доступа.</p>
            
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
                <Link to="/">Вернуться на главную</Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/login">Войти под другим аккаунтом</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccessDenied;
