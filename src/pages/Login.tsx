
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!email || !password) {
        toast.error('Пожалуйста, заполните все поля');
        return;
      }
      
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-sce-gray">
              <CardHeader className="bg-sce-red text-white">
                <CardTitle className="text-2xl">Вход в систему SCE</CardTitle>
                <CardDescription className="text-sce-lightGray">
                  Введите данные для доступа к секретным материалам
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="pt-6 pb-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Пароль</Label>
                        <Link to="/forgot-password" className="text-sm text-sce-red hover:underline">
                          Забыли пароль?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-sce-red hover:bg-sce-darkRed"
                    disabled={loading}
                  >
                    {loading ? 'Вход...' : 'Войти'}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Нет аккаунта?{' '}
                    <Link to="/register" className="text-sce-red hover:underline font-medium">
                      Зарегистрироваться
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
            
            <div className="mt-6 text-center text-sm text-sce-darkGray">
              <p>⚠️ ВНИМАНИЕ: Несанкционированный доступ к системе SCE преследуется по закону.</p>
              <p className="mt-2">Все попытки входа протоколируются системой безопасности.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
