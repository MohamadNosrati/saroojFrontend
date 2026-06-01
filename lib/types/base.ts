export interface IBaseResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface IPaginatedResponse<T> {
  result: T[];
  totalCount: number;
  totalPages: number;
}
