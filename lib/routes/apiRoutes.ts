import { queryStringCreator } from "../tools/searchParams";
import { IBlogParams } from "../types/blog";
import { IProjectParams } from "../types/project";

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
class User {
  private readonly base: string;

  constructor() {
    this.base = "users";
  }

  getAll() {
    return this.base;
  }

  update(id: string) {
    return `${this.base}/${id}`;
  }
}

class Upload {
  private readonly base: string;

  constructor() {
    this.base = "pictures";
  }

  upload() {
    return `${this.base}/upload`;
  }

  find(id: string) {
    return `${this.base}/${id}`;
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

  getAll(params?: IBlogParams) {
    const queryString = queryStringCreator(params);

    return `${this.base}?${queryString}`;
  }

  getAllSlugs() {
    return `${this.base}/get-all-slugs`;
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

  findBySlug(slug: string) {
    return `${this.base}/find-by-slug/${slug}`;
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

  getAll(params?: IProjectParams) {
    const queryString = queryStringCreator(params);

    return `${this.base}?${queryString}`;
  }

  getAllSlugs() {
    return `${this.base}/get-all-slugs`;
  }

  create() {
    return `${this.base}`;
  }

  findOne(id: string) {
    return `${this.base}/${id}`;
  }

  findBySlug(slug: string) {
    return `${this.base}/find-by-slug/${slug}`;
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

  getAllSlugs() {
    return `${this.base}/get-all-slugs`;
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
class Subscription {
  private readonly base: string;

  constructor() {
    this.base = "subscriptions";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }
}
class Notification {
  private readonly base: string;

  constructor() {
    this.base = "notifications";
  }

  getAll() {
    return `${this.base}`;
  }

  create() {
    return `${this.base}`;
  }
}

class Conversation {
  private readonly base: string;

  constructor() {
    this.base = "conversations";
  }

  getUserConversations(userId?: string) {
    return `${this.base}?participants=${userId}`;
  }
}
class Message {
  private readonly base: string;

  constructor() {
    this.base = "messages";
  }

  getConversationMessages(conversationId?: string) {
    return `${this.base}?conversationId=${conversationId}`;
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
export const userRoutes = new User();
export const subscriptionRoutes = new Subscription();
export const notificationRoutes = new Notification();
export const conversationRoutes = new Conversation();
export const messageRoutes = new Message();
