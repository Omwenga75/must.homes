export const ESTATES = [
  {
    id: "1",
    name: "Kigari",
    description: "One of the closest estates to MUST, popular for its affordability and tight-knit community feel.",
    averageDistance: 0.5,
    latitude: 0.0467,
    longitude: 37.6507,
  },
  {
    id: "2",
    name: "Makutano",
    description: "A vibrant market-adjacent estate with excellent transport links and plenty of affordable shops.",
    averageDistance: 1.2,
    latitude: 0.0484,
    longitude: 37.6523,
  },
  {
    id: "3",
    name: "Kaaga",
    description: "Serene residential area close to Kaaga Girls High School, loved for its quiet study environment.",
    averageDistance: 1.5,
    latitude: 0.0452,
    longitude: 37.6489,
  },
  {
    id: "4",
    name: "Kiirua",
    description: "A rapidly growing estate with modern rentals at competitive prices, great road access.",
    averageDistance: 2.0,
    latitude: 0.0501,
    longitude: 37.6545,
  },
  {
    id: "5",
    name: "Ntima",
    description: "Peaceful hillside estate offering stunning views and cooler temperatures year-round.",
    averageDistance: 2.3,
    latitude: 0.0435,
    longitude: 37.6471,
  },
  {
    id: "6",
    name: "Nchiru",
    description: "Established residential area with a mix of older and newer housing stock, family-friendly.",
    averageDistance: 2.8,
    latitude: 0.0519,
    longitude: 37.6562,
  },
  {
    id: "7",
    name: "Igoji",
    description: "A large estate known for affordable single rooms and bedsitters, ideal for first-year students.",
    averageDistance: 3.0,
    latitude: 0.0388,
    longitude: 37.6432,
  },
  {
    id: "8",
    name: "Mitunguu",
    description: "Busy commercial estate with 24-hour activity, shops, and excellent matatu connections to MUST.",
    averageDistance: 3.5,
    latitude: 0.0547,
    longitude: 37.6598,
  },
  {
    id: "9",
    name: "Nkubu",
    description: "Major trading centre with wide range of housing options, entertainment, and healthcare facilities.",
    averageDistance: 4.0,
    latitude: 0.0361,
    longitude: 37.6405,
  },
  {
    id: "10",
    name: "Kibirichia",
    description: "Quiet farming community estate offering the most spacious rentals and lowest prices around MUST.",
    averageDistance: 4.5,
    latitude: 0.0572,
    longitude: 37.6621,
  },
  {
    id: "11",
    name: "Timau",
    description: "High-altitude estate on the slopes of Mt. Kenya, cool climate and fresh produce market nearby.",
    averageDistance: 5.0,
    latitude: 0.0612,
    longitude: 37.6659,
  },
  {
    id: "12",
    name: "Meru Town",
    description: "The county capital with premium housing, excellent infrastructure, banks, hospitals, and malls.",
    averageDistance: 6.0,
    latitude: 0.0473,
    longitude: 37.6494,
  },
  {
    id: "13",
    name: "Mwanganthia",
    description: "Upcoming residential estate with newly built modern apartments, great value for money.",
    averageDistance: 1.8,
    latitude: 0.0493,
    longitude: 37.6537,
  },
  {
    id: "14",
    name: "Kinoro",
    description: "Lush green estate on the university periphery, popular for its spacious compounds and parking.",
    averageDistance: 0.8,
    latitude: 0.0461,
    longitude: 37.6513,
  },
] as const;

export const ROOM_TYPES = [
  { value: "single_room", label: "Single Room" },
  { value: "double_room", label: "Double Room" },
  { value: "bedsitter", label: "Bedsitter" },
  { value: "one_bedroom", label: "One Bedroom" },
  { value: "two_bedroom", label: "Two Bedroom" },
  { value: "three_bedroom", label: "Three Bedroom" },
  { value: "studio", label: "Studio Apartment" },
] as const;

export const AMENITIES = [
  { id: "wifi", label: "WiFi / Internet", icon: "Wifi" },
  { id: "water", label: "Running Water", icon: "Droplets" },
  { id: "electricity", label: "Electricity (24hr)", icon: "Zap" },
  { id: "security", label: "Security / Guard", icon: "Shield" },
  { id: "parking", label: "Parking Space", icon: "Car" },
  { id: "kitchen", label: "Shared Kitchen", icon: "ChefHat" },
  { id: "bathroom", label: "Private Bathroom", icon: "Bath" },
  { id: "furnished", label: "Furnished Room", icon: "Sofa" },
  { id: "study_room", label: "Study Room", icon: "BookOpen" },
  { id: "gym", label: "Gym / Fitness", icon: "Dumbbell" },
  { id: "laundry", label: "Laundry Area", icon: "WashingMachine" },
  { id: "cctv", label: "CCTV Surveillance", icon: "Camera" },
  { id: "backup_power", label: "Backup Generator", icon: "Battery" },
  { id: "garden", label: "Garden / Compound", icon: "Trees" },
  { id: "tv", label: "Cable TV", icon: "Tv" },
] as const;

export const PRICE_RANGES = {
  BUDGET: { min: 1000, max: 3000, label: "Budget (KES 1k–3k)" },
  AFFORDABLE: { min: 3000, max: 6000, label: "Affordable (KES 3k–6k)" },
  MID_RANGE: { min: 6000, max: 10000, label: "Mid-Range (KES 6k–10k)" },
  PREMIUM: { min: 10000, max: 20000, label: "Premium (KES 10k–20k)" },
  LUXURY: { min: 20000, max: 50000, label: "Luxury (KES 20k+)" },
} as const;

export const BOOKING_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
} as const;

export const PAYMENT_METHODS = {
  MPESA: "mpesa",
  BANK_TRANSFER: "bank_transfer",
  CARD: "card",
} as const;

export const USER_ROLES = {
  STUDENT: "student",
  CARETAKER: "caretaker",
  ADMIN: "admin",
} as const;
