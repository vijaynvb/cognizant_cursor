/** Pagination metadata per OpenAPI schema. */
export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

/** Error detail for validation errors. */
export interface ErrorDetail {
  field?: string;
  message: string;
}
