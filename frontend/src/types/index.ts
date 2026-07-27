// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = "student" | "caretaker" | "admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
}

// ─── Location ──────────────────────────────────────────────────────────────────

export interface Location {
  id: string;
  name: string;
  description: string;
  averageDistance: number;   // km from MUST main gate
  latitude: number;
  longitude: number;
  itemCount?: number;
  imageUrl?: string;
}

// ─── Item ───────────────────────────────────────────────────────────────────

export type Condition =
  | "single_room"
  | "double_room"
  | "bedsitter"
  | "one_bedroom"
  | "two_bedroom"
  | "three_bedroom"
  | "studio";

export type AvailabilityStatus = "available" | "occupied" | "reserved";

export interface Item {
  id: string;
  title: string;
  description: string;
  location: Location | string;           // populated or ID
  price: number;                     // monthly rent in KES
  deposit: number;                   // deposit in KES
  condition: Condition;
  amenities: string[];               // array of amenity IDs
  photos: string[];                  // array of image URLs
  videoUrl?: string;
  latitude?: number;
  longitude?: number;
  distanceMainGate: number;          // km
  distanceSchool: number;            // km (from school buildings)
  availability: AvailabilityStatus;
  featured: boolean;
  size?: number;                     // square meters
  caretakerName: string;
  caretakerPhone: string;
  ownerId?: string;
  reviewCount?: number;
  averageRating?: number;
  isFavorited?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentMethod = "mpesa" | "bank_transfer" | "card";

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  transactionRef: string;
  paymentMethod: PaymentMethod;
  paidAt?: string;
  createdAt: string;
}

// ─── Order ─────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "expired"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  itemId: string;
  item: Item;
  userId: string;
  user?: User;
  status: OrderStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt?: string;
  payment?: Payment;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  userId: string;
  user: Pick<User, "id" | "firstName" | "lastName" | "avatar">;
  itemId: string;
  rating: number;         // 1–5
  comments: string;
  photos?: string[];
  createdAt: string;
}

// ─── Notification ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: "order" | "payment" | "system" | "review";
  createdAt: string;
}

// ─── Filters ─────────────────────────────────────────────────────────────────

export interface ItemFilters {
  location?: string;
  condition?: Condition;
  minPrice?: number;
  maxPrice?: number;
  maxDistance?: number;
  amenities?: string[];
  availability?: AvailabilityStatus;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "distance_asc" | "newest" | "rating";
  search?: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
