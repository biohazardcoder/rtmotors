export interface VehicleTypes{
    _id: string;
    name: string;
    images: string[];
    brand: string;
    description: string;
    oldPrice: number;
    currentPrice: number;
    miles: number;
    fuelType: string;
    transmission: string;
    year: number;
    stock: number;
    comments: CommentTypes[];
    status?: {
        color: "fff" | "000";
        bg: string;
        text: string;
    }; 
    type: "new" | "used";
}


export interface BlogTypes {
    _id: string;
    image: string;
    video: string;
    title: string;
    text: string;
}


export interface CommentTypes {
    _id: string;
    user:{
        name: string;
        userId: string;
        avatar : string;
    },
    rating: number;
    message: string;
    createdAt: string;
}

export interface BrandTypes {
    _id: string;
    title: string;
    image: string;
    url: string;
}

export interface PartnerTypes {
    _id: string;
    image: string;
    url: string;
}
export interface AuctionTypes {
    _id: string;
    image: string;
    url: string;
}

export interface LogisticTypes {
    _id: string;
    image: string;
}


export interface OrderTypes {
  _id?: string
  car?: VehicleTypes
  user?: {
    name: string,
    avatar: string,
    email: string,
    id:string
  }
  orderId: string
  trackingNumber: string
  contact: string
  status: "pending" | "delivering" | "completed" | "canceled"
  createdAt?: Date
  updatedAt?: Date
}