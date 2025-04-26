
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToVerification, setRedirectToVerification] = useState(false);
  
  const { register, user } = useAuth();

  // Если пользователь уже вошел в систему, перенаправляем его на главную страницу
  if (user) {
    return <Navigate to="/" />;
  }
  
  if (redirectToHome) {
    return <Navigate to="/" />;
  }
  
  if (redirectToVerification) {
    return <Navigate to="/verification-pending" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    
    setLoading(true);
    
    try {
      // При регистрации первого пользователя не требуется анкета
      const users = localStorage.getItem('sce_users');
      const isFirstUser = !users || JSON.parse(users).length === 0;
      
      if (!isFirstUser && !bio) {
        toast.error('Пожалуйста, заполните анкету');
        setLoading(false);
        return;
      }
      
      const success = await register({
        username,
        email,
        password,
        bio
      });
      
      if (success) {
        if (isFirstUser) {
          toast.success('Регистрация успешна! Вы - первый пользователь с полным доступом к системе.');
          setRedirectToHome(true);
        } else {
          toast.success('Регистрация успешна! Пожалуйста, подтвердите ваш email и ожидайте одобрения администратором.');
          setRedirectToVerification(true);
        }
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
          <div className="max-w-lg mx-auto">
            <Card className="border-sce-gray">
              <CardHeader className="bg-sce-red text-white">
                <CardTitle className="text-2xl">Регистрация в системе SCE</CardTitle>
                <CardDescription className="text-sce-lightGray">
                  Заполните форму для получения доступа к секретным материалам
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="pt-6 pb-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input
                        id="username"
                        placeholder="agent_smith"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    
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
                      <Label htmlFor="password">Пароль</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Анкета (не требуется для первого пользователя) */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">
                        Анкета (Расскажите о себе)
                        <span className="text-xs text-sce-red ml-2">
                          * требуется для всех, кроме первого пользователя
                        </span>
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Расскажите, почему вы хотите присоединиться к Фонду SCE и какой у вас опыт работы с аномальными явлениями..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
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
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="text-sce-red hover:underline font-medium">
                      Войти
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
            
            <div className="mt-6 text-center text-sm text-sce-darkGray">
              <p>Регистрируясь, вы соглашаетесь с <Link to="/terms" className="text-sce-red hover:underline">Условиями использования</Link> и <Link to="/privacy" className="text-sce-red hover:underline">Политикой конфиденциальности</Link> Фонда SCE.</p>
              <p className="mt-2">Все учетные записи проходят проверку администратором перед активацией.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
