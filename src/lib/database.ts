
// Это имитация базы данных, которая использует localStorage
// В реальном проекте здесь будет взаимодействие с MySQL

// Типы данных
export interface SCEObject {
  id: string;
  number: string;
  name: string;
  class: string;
  description: string;
  containment: string;
  image?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
}

export interface ProfileData {
  userId: string;
  position: string;
  department: string;
  bio: string;
  accessLevel: number;
  imageUrl?: string;
}

// Функции для работы с SCE объектами
export const getSCEObjects = (): SCEObject[] => {
  const objects = localStorage.getItem('sce_objects');
  return objects ? JSON.parse(objects) : [];
};

export const getSCEObjectById = (id: string): SCEObject | null => {
  const objects = getSCEObjects();
  return objects.find(obj => obj.id === id) || null;
};

export const createSCEObject = (objectData: Omit<SCEObject, 'id' | 'createdAt' | 'updatedAt'>): SCEObject => {
  const objects = getSCEObjects();
  
  const newObject: SCEObject = {
    ...objectData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('sce_objects', JSON.stringify([...objects, newObject]));
  return newObject;
};

export const updateSCEObject = (id: string, objectData: Partial<SCEObject>): SCEObject | null => {
  const objects = getSCEObjects();
  const index = objects.findIndex(obj => obj.id === id);
  
  if (index === -1) return null;
  
  const updatedObject = {
    ...objects[index],
    ...objectData,
    updatedAt: new Date().toISOString()
  };
  
  objects[index] = updatedObject;
  localStorage.setItem('sce_objects', JSON.stringify(objects));
  
  return updatedObject;
};

export const deleteSCEObject = (id: string): boolean => {
  const objects = getSCEObjects();
  const filteredObjects = objects.filter(obj => obj.id !== id);
  
  if (filteredObjects.length === objects.length) return false;
  
  localStorage.setItem('sce_objects', JSON.stringify(filteredObjects));
  return true;
};

// Функции для работы с новостями
export const getNewsArticles = (): NewsArticle[] => {
  const articles = localStorage.getItem('sce_news');
  return articles ? JSON.parse(articles) : [];
};

export const getNewsArticleById = (id: string): NewsArticle | null => {
  const articles = getNewsArticles();
  return articles.find(article => article.id === id) || null;
};

export const createNewsArticle = (articleData: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>): NewsArticle => {
  const articles = getNewsArticles();
  
  const newArticle: NewsArticle = {
    ...articleData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('sce_news', JSON.stringify([...articles, newArticle]));
  return newArticle;
};

export const updateNewsArticle = (id: string, articleData: Partial<NewsArticle>): NewsArticle | null => {
  const articles = getNewsArticles();
  const index = articles.findIndex(article => article.id === id);
  
  if (index === -1) return null;
  
  const updatedArticle = {
    ...articles[index],
    ...articleData,
    updatedAt: new Date().toISOString()
  };
  
  articles[index] = updatedArticle;
  localStorage.setItem('sce_news', JSON.stringify(articles));
  
  return updatedArticle;
};

export const deleteNewsArticle = (id: string): boolean => {
  const articles = getNewsArticles();
  const filteredArticles = articles.filter(article => article.id !== id);
  
  if (filteredArticles.length === articles.length) return false;
  
  localStorage.setItem('sce_news', JSON.stringify(filteredArticles));
  return true;
};

// Функции для работы с профилями
export const getProfiles = (): ProfileData[] => {
  const profiles = localStorage.getItem('sce_profiles');
  return profiles ? JSON.parse(profiles) : [];
};

export const getProfileByUserId = (userId: string): ProfileData | null => {
  const profiles = getProfiles();
  return profiles.find(profile => profile.userId === userId) || null;
};

export const createProfile = (profileData: ProfileData): ProfileData => {
  const profiles = getProfiles();
  
  // Проверяем, существует ли уже профиль для этого пользователя
  const existingProfile = profiles.find(profile => profile.userId === profileData.userId);
  if (existingProfile) {
    // Обновляем существующий профиль
    return updateProfile(profileData.userId, profileData) as ProfileData;
  }
  
  // Создаем новый профиль
  localStorage.setItem('sce_profiles', JSON.stringify([...profiles, profileData]));
  return profileData;
};

export const updateProfile = (userId: string, profileData: Partial<ProfileData>): ProfileData | null => {
  const profiles = getProfiles();
  const index = profiles.findIndex(profile => profile.userId === userId);
  
  if (index === -1) return null;
  
  const updatedProfile = {
    ...profiles[index],
    ...profileData
  };
  
  profiles[index] = updatedProfile;
  localStorage.setItem('sce_profiles', JSON.stringify(profiles));
  
  return updatedProfile;
};

// Функции для администрирования

// Получить список пользователей, ожидающих одобрения
export const getPendingUsers = () => {
  const users = localStorage.getItem('sce_users');
  if (!users) return [];
  
  return JSON.parse(users).filter((user: any) => user.pendingApproval);
};

// Одобрить регистрацию пользователя
export const approveUser = (userId: string): boolean => {
  const users = localStorage.getItem('sce_users');
  if (!users) return false;
  
  const usersList = JSON.parse(users);
  const userIndex = usersList.findIndex((user: any) => user.id === userId);
  
  if (userIndex === -1) return false;
  
  usersList[userIndex].pendingApproval = false;
  localStorage.setItem('sce_users', JSON.stringify(usersList));
  
  return true;
};

// Отклонить регистрацию пользователя
export const rejectUser = (userId: string): boolean => {
  const users = localStorage.getItem('sce_users');
  if (!users) return false;
  
  const usersList = JSON.parse(users);
  const filteredUsers = usersList.filter((user: any) => user.id !== userId);
  
  localStorage.setItem('sce_users', JSON.stringify(filteredUsers));
  
  return true;
};

// Изменить уровень доступа пользователя
export const updateUserAccessLevel = (userId: string, accessLevel: number): boolean => {
  const users = localStorage.getItem('sce_users');
  if (!users) return false;
  
  const usersList = JSON.parse(users);
  const userIndex = usersList.findIndex((user: any) => user.id === userId);
  
  if (userIndex === -1) return false;
  
  usersList[userIndex].accessLevel = accessLevel;
  localStorage.setItem('sce_users', JSON.stringify(usersList));
  
  // Если пользователь в данный момент залогинен, обновим его данные
  const currentUser = localStorage.getItem('sce_current_user');
  if (currentUser) {
    const userObj = JSON.parse(currentUser);
    if (userObj.id === userId) {
      userObj.accessLevel = accessLevel;
      localStorage.setItem('sce_current_user', JSON.stringify(userObj));
    }
  }
  
  return true;
};
