
export interface AdminTypes {
  createdAt: string;
  firstName: string;
  email: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CarTypes {
  _id: string;
  name: string;
  images?: string[];
  brand: string;
  description: string;
  oldPrice: number;
  currentPrice: number;
  miles: number;
  fuelType: string;
  transmission: string;
  year: number;
  stock: number;
  comments?: CommentTypes[];
  status?: {
      color: "fff" | "000";
      bg: string;
      text: string;
  }; 
  type: "new" | "used";
}

export interface CommentTypes {
    _id: string;
    user:{
        name: string;
        userId: string;
        avatar : string;
    },
    message: string;
    createdAt: Date;
}

export interface UserTypes {
  id: string
  firstName: string
  lastName: string
  emailAddress: string
  createdAt: number
  avatar: string
}

export interface BrandTypes {
  _id: string
  title: string
  image: string
  url: string
  createdAt: number
  updatedAt: number
}

export interface PartnerTypes {
  _id: string
  image: string
  url: string
  createdAt: number
  updatedAt: number
}
export interface AuctionTypes {
  _id: string
  image: string
  url: string
  createdAt: number
  updatedAt: number
}