export type Page = {
  pageNum: number | string;
  pageSize: number | string;
  username?: string;
};

// export interface Response<T = unknown> {
//   code: number;
//   data?: T;
//   message: any;
// }
export type BodyParam = {
  typeId?: number | string;
};
