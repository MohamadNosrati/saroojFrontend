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

  singleProjectPage(id:string){
    return `/projects/${id}`
  }
}

class EnglishNavigationRoutes {

  private readonly base :string;

  constructor(){
    this.base = "/english"
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

  singleProjectPage(id:string){
   return `${this.base}/projects/${id}`;
  }
}
