
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { getPendingUsers, approveUser, rejectUser, updateUserAccessLevel } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Pencil, UserPlus, FileText, Globe, Settings } from 'lucide-react';

interface PendingUser {
  id: string;
  username: string;
  email: string;
  bio: string;
  registered: string;
}

interface RegisteredUser {
  id: string;
  username: string;
  email: string;
  accessLevel: number;
  registered: string;
}

const Admin = () => {
  const { user } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Перенаправляем пользователя, если он не админ
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.accessLevel < 5) {
    return <Navigate to="/access-denied" />;
  }

  useEffect(() => {
    const loadUsers = () => {
      try {
        // Загружаем пользователей, ожидающих одобрения
        const pending = getPendingUsers();
        setPendingUsers(pending);

        // Загружаем всех зарегистрированных пользователей
        const users = localStorage.getItem('sce_users');
        if (users) {
          const parsedUsers = JSON.parse(users);
          const registered = parsedUsers
            .filter((u: any) => !u.pendingApproval)
            .map((u: any) => ({
              id: u.id,
              username: u.username,
              email: u.email,
              accessLevel: u.accessLevel,
              registered: u.registered
            }));
          setRegisteredUsers(registered);
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        toast.error('Не удалось загрузить список пользователей');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleApproveUser = (userId: string) => {
    try {
      const success = approveUser(userId);
      if (success) {
        // Обновляем список пользователей
        setPendingUsers(pendingUsers.filter(user => user.id !== userId));
        toast.success('Пользователь успешно одобрен');
        
        // Загружаем обновленный список зарегистрированных пользователей
        const users = localStorage.getItem('sce_users');
        if (users) {
          const parsedUsers = JSON.parse(users);
          const approved = parsedUsers.find((u: any) => u.id === userId);
          if (approved) {
            setRegisteredUsers([...registeredUsers, {
              id: approved.id,
              username: approved.username,
              email: approved.email,
              accessLevel: approved.accessLevel,
              registered: approved.registered
            }]);
          }
        }
      } else {
        toast.error('Не удалось одобрить пользователя');
      }
    } catch (error) {
      console.error('Ошибка при одобрении пользователя:', error);
      toast.error('Произошла ошибка при одобрении пользователя');
    }
  };

  const handleRejectUser = (userId: string) => {
    try {
      const success = rejectUser(userId);
      if (success) {
        setPendingUsers(pendingUsers.filter(user => user.id !== userId));
        toast.success('Пользователь отклонен');
      } else {
        toast.error('Не удалось отклонить пользователя');
      }
    } catch (error) {
      console.error('Ошибка при отклонении пользователя:', error);
      toast.error('Произошла ошибка при отклонении пользователя');
    }
  };

  const handleChangeAccessLevel = (userId: string, level: string) => {
    try {
      const accessLevel = parseInt(level);
      const success = updateUserAccessLevel(userId, accessLevel);
      if (success) {
        // Обновляем список пользователей с новым уровнем доступа
        setRegisteredUsers(registeredUsers.map(user => 
          user.id === userId ? { ...user, accessLevel } : user
        ));
        toast.success('Уровень доступа успешно изменен');
      } else {
        toast.error('Не удалось изменить уровень доступа');
      }
    } catch (error) {
      console.error('Ошибка при изменении уровня доступа:', error);
      toast.error('Произошла ошибка при изменении уровня доступа');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sce-red">Панель администратора</h1>
            <p className="text-sce-darkGray">Управление пользователями и контентом Фонда SCE</p>
          </div>
          
          <Tabs defaultValue="pending">
            <TabsList className="mb-6">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Ожидающие одобрения
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="objects" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Объекты SCE
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Новости
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Настройки сайта
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Пользователи, ожидающие одобрения</CardTitle>
                  <CardDescription>
                    Проверьте и одобрите новых пользователей, желающих присоединиться к Фонду SCE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-center py-4">Загрузка данных...</p>
                  ) : pendingUsers.length === 0 ? (
                    <div className="text-center py-8 text-sce-darkGray">
                      <p>На данный момент нет пользователей, ожидающих одобрения</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Имя пользователя</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Анкета</TableHead>
                          <TableHead>Дата регистрации</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toast.info(user.bio || 'Анкета не заполнена')}
                              >
                                Просмотреть
                              </Button>
                            </TableCell>
                            <TableCell>{formatDate(user.registered)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600"
                                  onClick={() => handleApproveUser(user.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Одобрить
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600"
                                  onClick={() => handleRejectUser(user.id)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Отклонить
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Зарегистрированные пользователи</CardTitle>
                  <CardDescription>
                    Управление доступом и ролями пользователей
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-center py-4">Загрузка данных...</p>
                  ) : registeredUsers.length === 0 ? (
                    <div className="text-center py-8 text-sce-darkGray">
                      <p>Нет зарегистрированных пользователей</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Имя пользователя</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Уровень доступа</TableHead>
                          <TableHead>Дата регистрации</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registeredUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Select 
                                defaultValue={user.accessLevel.toString()}
                                onValueChange={(value) => handleChangeAccessLevel(user.id, value)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Уровень" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Уровень 1</SelectItem>
                                  <SelectItem value="2">Уровень 2</SelectItem>
                                  <SelectItem value="3">Уровень 3</SelectItem>
                                  <SelectItem value="4">Уровень 4</SelectItem>
                                  <SelectItem value="5">Уровень 5</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>{formatDate(user.registered)}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Pencil className="w-4 h-4 mr-1" />
                                Редактировать
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="objects">
              <Card>
                <CardHeader>
                  <CardTitle>Управление объектами SCE</CardTitle>
                  <CardDescription>
                    Создание, редактирование и удаление объектов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-sce-darkGray mb-4">Здесь вы можете управлять объектами SCE</p>
                    <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
                      <a href="/objects/create">Создать новый объект SCE</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news">
              <Card>
                <CardHeader>
                  <CardTitle>Управление новостями</CardTitle>
                  <CardDescription>
                    Публикация и редактирование новостей Фонда
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-sce-darkGray mb-4">Здесь вы можете управлять новостями Фонда SCE</p>
                    <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
                      <a href="/news/create">Создать новость</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки сайта</CardTitle>
                  <CardDescription>
                    Управление глобальными настройками сайта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-sce-darkGray">Функция находится в разработке</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
