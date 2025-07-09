import { FilterQuery } from 'mongoose';

/**
 * Xây dựng một đối tượng truy vấn MongoDB từ các tham số.
 * Hàm này sẽ bỏ qua các trường dùng cho phân trang và sắp xếp.
 *
 * @param params - Đối tượng chứa các tham số truy vấn (ví dụ: từ req.query).
 * @param searchableFields - Mảng các trường sẽ được tìm kiếm bằng regex (không phân biệt hoa thường).
 * @returns Một đối tượng FilterQuery của Mongoose.
 */
export function buildQueryFilter<T>(
  params: Record<string, any>,
  searchableFields: string[] = [],
): FilterQuery<T> {
  const query: Record<string, any> = {};

  for (const key in params) {
    // Chỉ xử lý các thuộc tính của chính đối tượng và có giá trị
    if (
      Object.prototype.hasOwnProperty.call(params, key) &&
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ''
    ) {
      // Bỏ qua các trường đặc biệt dùng cho phân trang và sắp xếp
      if (['page', 'limit', 'sortBy', 'sortOrder'].includes(key)) {
        continue;
      }

      if (searchableFields.includes(key) && typeof params[key] === 'string') {
        // Tìm kiếm không phân biệt hoa thường cho các trường được chỉ định
        query[key] = { $regex: params[key], $options: 'i' };
      } else {
        // So khớp chính xác cho các trường khác
        query[key] = params[key] as unknown as T[keyof T];
      }
    }
  }

  return query as FilterQuery<T>;
}
