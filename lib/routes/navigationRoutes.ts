class PersianNavigationRoutes {
  private readonly base: string;
  constructor() {
    this.base = "/fa";
  }
  homePage() {
    return `${this.base}/`;
  }

  aboutPage() {
    return `${this.base}/about`;
  }

  projectsPage() {
    return `${this.base}/projects`;
  }

  categoryProjectsPage(categoryTitle: string) {
    return `${this.base}/projects?categoryTitle=${categoryTitle}`;
  }

  singleProjectPage(id: string) {
    return `${this.base}/projects/${id}`;
  }

  blogsPage() {
    return `${this.base}/blogs/`;
  }

  singleBlogPage(slug: string) {
    return `${this.base}/blogs/${slug}`;
  }
}

class EnglishNavigationRoutes {
  private readonly base: string;

  constructor() {
    this.base = "/en";
  }

  homePage() {
    return `${this.base}/`;
  }

  aboutPage() {
    return `${this.base}/about`;
  }

  projectsPage() {
    return `${this.base}/projects`;
  }

  categoryProjectsPage(categoryTitle: string) {
    return `${this.base}/projects?categoryTitle=${categoryTitle}`;
  }

  singleProjectPage(id: string) {
    return `${this.base}/projects/${id}`;
  }

  blogsPage() {
    return `${this.base}/blogs/`;
  }

  singleBlogPage(slug: string) {
    return `${this.base}/blogs/${slug}`;
  }
}

class DashboardRoute {
  private readonly base: string;

  constructor() {
    this.base = "/dashboard";
  }
  dashboard() {
    return `${this.base}`;
  }

  teamates() {
    return `${this.base}/teamates`;
  }

  comments() {
    return `${this.base}/comments`;
  }

  projects() {
    return `${this.base}/projects`;
  }

  categories() {
    return `${this.base}/categories`;
  }

  sliders() {
    return `${this.base}/sliders`;
  }

  blogs() {
    return `${this.base}/blogs`;
  }

  notification() {
    return `${this.base}/notifications`;
  }

  chatroom() {
    return `${this.base}/chatroom`;
  }

  users() {
    return `${this.base}/users`;
  }

  uploads() {
    return `${this.base}/uploads`;
  }
}

class FrontAuthRoutes {
  signIn() {
    return `/signin`;
  }
}

export const dashboardRoutes = new DashboardRoute();
export const persianRoutes = new PersianNavigationRoutes();
export const englishRoutes = new EnglishNavigationRoutes();
export const frontAuthRoutes = new FrontAuthRoutes();
