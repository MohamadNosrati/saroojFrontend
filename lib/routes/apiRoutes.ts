class Auth {
  private readonly base: string;

  constructor() {
    this.base = "auth";
  }

  signin() {
    return `${this.base}/signin`;
  }

  signup() {
    return `${this.base}/signup`;
  }
}

class Upload {
  private readonly base: string;

  constructor() {
    this.base = "pictures";
  }

  upload(){
    return `${this.base}/upload`
  }

  find(id:string){
    return `${this.base}/${id}`
  }

}

class Catgories {
  private readonly base: string;

  constructor() {
    this.base = "categories";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }

  delete(id: string) {
    return `${this.base}/${id}`;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}

class Blogs {
  private readonly base: string;

  constructor() {
    this.base = "blogs";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }

  delete(id: string) {
    return `${this.base}/${id}`;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}
class Sliders {
  private readonly base: string;

  constructor() {
    this.base = "sliders";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }

  delete(id: string) {
    return `${this.base}/${id}`;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}

class Projects {
  private readonly base: string;

  constructor() {
    this.base = "projects";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }

    findBySlug(slug:string){
    return `${this.base}/find-by-slug/${slug}`
  }

  delete(id: string) {
    return `${this.base}/${id}`;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}

class Comments {
  private readonly base: string;

  constructor() {
    this.base = "comments";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }

  delete(id: string) {
    return `${this.base}/${id}`;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}

class Temates {
  private readonly base: string;

  constructor() {
    this.base = "teamates";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }



  delete(id: string) {
    return `${this.base}/${id}`;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}


export const categoriesRoute = new Catgories();
export const ProjectsRoute = new Projects();
export const CommentsRoute = new Comments();
export const TeamatesRoute = new Temates();
export const AuthRoute = new Auth();
export const uploadRoutes = new Upload();
export const sliderRoutes = new Sliders();
export const blogsRoutes = new Blogs();
