export interface Column {
  title?: string;
  field?: string;
  width?: string | number;
  checkbox?: boolean;
  sortable?: boolean;
  isOperate?: boolean;
  order?: 'asc' | 'desc';
  formatter?: Function;
  searchable?: boolean;
  event?: any;
}
