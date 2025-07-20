export enum RecordStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum StatusItem {
  IN_STOCK = 1, // Còn hàng
  OUT_OF_STOCK = 2, // Hết hàng
  UNDER_MAINTENANCE = 3, // Đang bảo trì
  DAMAGED = 4, // Hư hỏng
  OBSOLETE = 5, // Lỗi thời
  DISCONTINUED = 6, // Ngừng sản xuất
  RESERVED = 7, // Đã đặt hàng
}
export enum TicketStatus {
  NEW = 0, // Khởi tạo
  CONFIRMED = 1, // Đã xác nhận
  CANCELLED = 2, // Đã hủy
  EXPIRED = 4, // Đã hết hạn
  COMPLETE = 5, // Đã hoàn thành
  UNCONFIRMED = 6, // Chờ xác nhận
}
export enum TypeTicket {
  WARRANTY = 'Phiếu bảo hành',
  REPAIR = 'Phiếu sửa chữa',
  CONTRACT = 'Phiếu hợp đồng',
}
