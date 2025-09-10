class PersianNavigationRoutes {
  homePage() {
    return "/";
  }

  aboutPage() {
    return "/about";
  }

  projectsPage() {
    return "/projects";
  }

  singleProjectPage(id: string) {
    return `/projects/${id}`;
  }
}

class EnglishNavigationRoutes {
  private readonly base: string;

  constructor() {
    this.base = "/english";
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

  singleProjectPage(id: string) {
    return `${this.base}/projects/${id}`;
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
}

export const dashboardRoutes = new DashboardRoute();
