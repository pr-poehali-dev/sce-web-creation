
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="border-sce-gray mb-8">
            <CardHeader className="bg-sce-red text-white">
              <CardTitle className="text-2xl">Политика конфиденциальности SCE Foundation</CardTitle>
              <CardDescription className="text-sce-lightGray">
                Последнее обновление: 26 апреля 2025 г.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6 pb-6 prose max-w-none">
              <p>
                Эта Политика конфиденциальности описывает, как Фонд SCE (Secure, Control, Explore) собирает, 
                использует и раскрывает вашу информацию при использовании нашего сайта.
              </p>

              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-sce-red rounded-full p-2 text-white mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sce-red">1. Информация, которую мы собираем</h3>
                  <p>
                    При регистрации на нашем сайте мы собираем следующую информацию:
                  </p>
                  <ul>
                    <li><strong>Личная информация:</strong> имя пользователя, адрес электронной почты</li>
                    <li><strong>Учетные данные:</strong> пароль (хранится в зашифрованном виде)</li>
                    <li><strong>Биографическая информация:</strong> анкетные данные, которые вы предоставляете при регистрации</li>
                    <li><strong>Данные журнала:</strong> IP-адрес, тип браузера, время доступа, просмотренные страницы</li>
                    <li><strong>Данные об устройстве:</strong> тип устройства, операционная система, уникальные идентификаторы устройства</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-sce-red rounded-full p-2 text-white mt-1">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sce-red">2. Как мы используем вашу информацию</h3>
                  <p>
                    Мы используем собранную информацию для следующих целей:
                  </p>
                  <ul>
                    <li>Создание и управление вашей учетной записью</li>
                    <li>Обеспечение и поддержание нашего сайта</li>
                    <li>Аутентификация пользователей и обеспечение безопасности</li>
                    <li>Соблюдение наших внутренних протоколов безопасности</li>
                    <li>Улучшение и персонализация пользовательского опыта</li>
                    <li>Связь с вами по вопросам, связанным с вашей учетной записью</li>
                    <li>Оценка кандидатов для различных уровней доступа</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-sce-red rounded-full p-2 text-white mt-1">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sce-red">3. Раскрытие информации</h3>
                  <p>
                    Фонд SCE не продает, не обменивает и не передает вашу личную информацию третьим сторонам без вашего согласия, 
                    за исключением случаев, когда это необходимо для:
                  </p>
                  <ul>
                    <li>Соблюдения правовых требований, таких как судебный приказ или закон</li>
                    <li>Защиты наших прав или безопасности</li>
                    <li>Расследования потенциальных нарушений наших условий использования</li>
                    <li>Защиты от юридической ответственности</li>
                  </ul>
                  <p>
                    <strong>Внимание:</strong> В случае обнаружения потенциально опасной аномальной активности, связанной с вашей 
                    учетной записью, ваша информация может быть передана соответствующим отделам Фонда SCE для расследования.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-sce-red rounded-full p-2 text-white mt-1">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sce-red">4. Хранение и безопасность данных</h3>
                  <p>
                    Мы применяем строгие меры безопасности для защиты вашей личной информации:
                  </p>
                  <ul>
                    <li>Использование шифрования при передаче и хранении конфиденциальных данных</li>
                    <li>Ограничение доступа к личной информации сотрудникам, агентам и подрядчикам на основе принципа "необходимо знать"</li>
                    <li>Регулярное обновление наших систем безопасности</li>
                    <li>Периодический аудит наших практик обработки данных</li>
                  </ul>
                  <p>
                    Несмотря на наши усилия, ни один метод передачи через Интернет или метод электронного хранения не является 
                    на 100% безопасным. Мы не можем гарантировать абсолютную безопасность ваших данных.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-sce-red rounded-full p-2 text-white mt-1">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sce-red">5. Ваши права</h3>
                  <p>
                    В отношении вашей личной информации у вас есть следующие права:
                  </p>
                  <ul>
                    <li><strong>Доступ:</strong> Вы можете запросить копию ваших персональных данных</li>
                    <li><strong>Исправление:</strong> Вы можете запросить исправление неточной или неполной информации</li>
                    <li><strong>Удаление:</strong> Вы можете запросить удаление ваших данных при определенных обстоятельствах</li>
                    <li><strong>Ограничение обработки:</strong> Вы можете запросить ограничение обработки ваших данных</li>
                    <li><strong>Отзыв согласия:</strong> Вы можете отозвать свое согласие в любое время</li>
                  </ul>
                  <p>
                    <strong>Примечание:</strong> Некоторые из этих прав могут быть ограничены в случаях, когда их реализация 
                    противоречит протоколам безопасности Фонда SCE или может поставить под угрозу содержание аномальных объектов.
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-sce-red">6. Cookies и технологии отслеживания</h3>
              <p>
                Мы используем cookies и аналогичные технологии отслеживания для улучшения вашего опыта на нашем сайте. 
                Cookies — это небольшие файлы, которые сайт или его поставщик услуг передает на жесткий диск вашего компьютера 
                через веб-браузер (если вы это разрешили).
              </p>
              <p>
                Мы используем cookies для:
              </p>
              <ul>
                <li>Сохранения ваших предпочтений и настроек</li>
                <li>Аутентификации и обеспечения безопасности вашей учетной записи</li>
                <li>Анализа трафика и тенденций использования сайта</li>
                <li>Понимания и сохранения ваших предпочтений для будущих посещений</li>
              </ul>

              <h3 className="font-bold text-sce-red">7. Изменения в Политике конфиденциальности</h3>
              <p>
                Фонд SCE оставляет за собой право обновлять или изменять нашу Политику конфиденциальности в любое время. 
                Изменения вступают в силу немедленно после их публикации на сайте. Мы рекомендуем периодически проверять 
                эту страницу на наличие изменений.
              </p>

              <h3 className="font-bold text-sce-red">8. Контактная информация</h3>
              <p>
                Если у вас есть вопросы или опасения относительно нашей Политики конфиденциальности, свяжитесь с нами:
              </p>
              <p>
                Электронная почта: privacy@sce-foundation.org<br />
                Отдел информационной безопасности Фонда SCE
              </p>

              <div className="mt-8 p-4 border-2 border-sce-red bg-sce-lightGray text-center">
                <p className="font-bold">УВЕДОМЛЕНИЕ О МОНИТОРИНГЕ</p>
                <p>Для обеспечения безопасности содержания аномальных объектов, все действия пользователей на этом сайте 
                могут отслеживаться и регистрироваться в целях безопасности.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
