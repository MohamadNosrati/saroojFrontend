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

class File {
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
    this.base = "temates";
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

class Pictures {
  private readonly base: string;

  constructor() {
    this.base = "pictures";
  }

  uploadMany() {
    return `${this.base}/upload`;
  }
}

export const categoriesRoute = new Catgories();
export const ProjectsRoute = new Projects();
export const CommentsRoute = new Comments();
export const TeamatesRoute = new Temates();
export const PictresRoute = new Pictures();
export const AuthRoute = new Auth();
export const filesRoute = new File();
