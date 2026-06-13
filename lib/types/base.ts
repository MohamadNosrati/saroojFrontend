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

export interface ISocketAcknowledgement<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}
