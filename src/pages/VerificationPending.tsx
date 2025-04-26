
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Mail, Clock } from 'lucide-react';

const VerificationPending = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <Card className="border-sce-gray">
              <CardHeader className="bg-sce-red text-white">
                <div className="flex justify-center mb-4">
                  <Clock className="w-16 h-16" />
                </div>
                <CardTitle className="text-2xl">Ожидание подтверждения</CardTitle>
                <CardDescription className="text-sce-lightGray">
                  Ваша заявка находится на рассмотрении
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6 pb-4 text-left">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-sce-red rounded-full p-2 text-white">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Подтвердите ваш email</h3>
                      <p className="text-sm text-gray-600">
                        На ваш email было отправлено письмо с ссылкой для подтверждения. 
                        Пожалуйста, проверьте ваш почтовый ящик и следуйте инструкциям.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-sce-red rounded-full p-2 text-white">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Ожидание одобрения администратором</h3>
                      <p className="text-sm text-gray-600">
                        После подтверждения email ваша заявка будет рассмотрена администратором Фонда SCE.
                        Этот процесс может занять некоторое время, так как мы тщательно проверяем всех кандидатов.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-sce-red rounded-full p-2 text-white">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Доступ к системе</h3>
                      <p className="text-sm text-gray-600">
                        После одобрения вашей заявки вы получите доступ к базе данных Фонда SCE 
                        с уровнем допуска, соответствующим вашей должности и опыту.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login">Вернуться на страницу входа</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-6 text-sm text-sce-darkGray">
              <p>Если у вас возникли вопросы, свяжитесь с нами по адресу <span className="text-sce-red">support@sce-foundation.org</span></p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerificationPending;
