export interface ProductQueryParams {
  page?: number;
  keyword?: string;
  limit?: number;
  sort?: string;
  fields?: string;
  priceGte?: number;
  priceLte?: number;
  brand?: string | string[]; // تقبل نص واحد أو أراي من النصوص
  categoryId?: string | string[]; // تقبل نص واحد أو أراي من النصوص
}
