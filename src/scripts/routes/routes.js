import RegisterPage from '../pages/auth/register/register-page';
import LoginPage from '../pages/auth/login/login-page';
import HomePage from '../pages/home/home-page';
import StoryDetailPage from '../pages/story-detail/story-detail-page';
import NewStory from '../pages/new/new-story-page';
import BookmarkPage from '../pages/bookmark-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/new': () => checkAuthenticatedRoute(new NewStory()),
  '/stories/:id': () => checkAuthenticatedRoute(new StoryDetailPage()),
  '/bookmark': () => checkAuthenticatedRoute(new BookmarkPage()),
};
