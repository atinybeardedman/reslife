export interface RecordAction<T> {
  record: T;
  action: 'edit' | 'delete'
}
