export interface Column {
    title?: string;
    field?: string;
    width?: string | number;
    checkbox?: boolean;
    sortable?: boolean;
    order?: 'asc' | 'desc';
    formatter?: Function;
    searchable?: boolean;
}
