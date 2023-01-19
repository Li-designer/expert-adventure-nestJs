export type Page = {
  pageNum: number;
  pageSize: number;
  username?: string;
  messageName?: string;
  messageDesc?: string;
};

export interface Response<T = unknown> {
  code: number;
  data?: T;
  message: any;
}
export type BodyParam = {
  typeId?: number | string;
};
