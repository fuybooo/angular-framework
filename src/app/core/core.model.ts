export interface HttpRes {
  code: number;
  msg: string;
  data: any | {
    result?: Array<any>,
    pageNumber?: number,
    pageSize?: number,
    total?: number
  };
}
