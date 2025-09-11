interface ICommentPayload {
    fullName:string;
    email:string;
    text:string;
}

interface IComment {
    id:string
    fullName:string;
    email:string;
    text:string;
    createdAt:Date;
    updatedAt:Date;
    isActive:boolean;
}