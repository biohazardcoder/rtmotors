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