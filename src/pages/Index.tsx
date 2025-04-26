
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewsArticles, getSCEObjects } from '@/lib/database';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [featuredObjects, setFeaturedObjects] = useState<any[]>([]);

  useEffect(() => {
    // Загружаем последние новости
    const news = getNewsArticles();
    setLatestNews(news.filter(article => article.status === 'published').slice(0, 3));

    // Загружаем рекомендуемые объекты
    const objects = getSCEObjects();
    setFeaturedObjects(objects.filter(obj => obj.status === 'published').slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero секция */}
        <section className="bg-sce-red text-white py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold sce-logo mb-6">
                SCE FOUNDATION
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Secure. Control. Explore.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  className="bg-white text-sce-red hover:bg-sce-lightGray"
                  size="lg"
                >
                  <Link to="/objects">Изучить объекты SCE</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-white text-white hover:bg-sce-darkRed"
                  size="lg"
                >
                  <Link to="/about">О Фонде</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Предупреждение */}
        <section className="bg-sce-darkGray text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="font-bold">⚠️ ПРЕДУПРЕЖДЕНИЕ: Все материалы на этом сайте имеют гриф "Совершенно секретно"</p>
            <p className="text-sm">Несанкционированный доступ или раскрытие информации преследуется по закону.</p>
          </div>
        </section>

        {/* Рекомендуемые объекты */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Обнаруженные объекты SCE</h2>
            
            {featuredObjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredObjects.map((object) => (
                  <Card key={object.id} className="sce-object-box border-sce-gray hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-sce-red text-white py-2 px-4">
                      <CardTitle className="text-xl font-mono">SCE-{object.number}</CardTitle>
                      <CardDescription className="text-sce-lightGray">Класс: {object.class}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <h3 className="font-bold text-lg mb-2">{object.name}</h3>
                      <p className="line-clamp-3">{object.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full bg-sce-darkRed hover:bg-sce-red">
                        <Link to={`/objects/${object.id}`}>Подробнее</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-sce-lightGray rounded-md">
                <p className="mb-4">Пока нет зарегистрированных объектов SCE.</p>
                <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
                  <Link to="/objects/create">Создать первый объект</Link>
                </Button>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-sce-red text-sce-red hover:bg-sce-lightGray">
                <Link to="/objects">Просмотреть все объекты</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Последние новости */}
        <section className="py-12 bg-sce-lightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Новости Фонда</h2>
            
            {latestNews.length > 0 ? (
              <div className="space-y-6">
                {latestNews.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>{new Date(article.createdAt).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2">{article.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="border-sce-red text-sce-red hover:bg-sce-lightGray">
                        <Link to={`/news/${article.id}`}>Читать полностью</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-md">
                <p className="mb-4">Пока нет опубликованных новостей.</p>
                <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
                  <Link to="/news/create">Создать новость</Link>
                </Button>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-sce-red text-sce-red hover:bg-sce-lightGray">
                <Link to="/news">Все новости</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* О Фонде краткая секция */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">О Фонде SCE</h2>
              <p className="text-lg mb-8">
                Фонд SCE (Secure. Control. Explore.) - секретная организация, занимающаяся 
                обнаружением, содержанием и изучением аномальных объектов и явлений, угрожающих 
                нормальному функционированию человеческой цивилизации.
              </p>
              <Button asChild className="bg-sce-red hover:bg-sce-darkRed">
                <Link to="/about">Подробнее о нас</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
