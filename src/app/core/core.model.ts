export interface HttpRes {
  code: string;
  msg: string;
  data: any | {
    result?: Array<any>,
    pageNumber?: number,
    pageSize?: number,
    total?: number
  };
}
