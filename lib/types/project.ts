export type ImageType = "before" | "after"

export interface IBFImage {
    name:string;
    type:ImageType;
    pictureId:string;
}

export interface IProjectPayload {
    title:string;
    categoryId:string;
    pictureId:string;
    images: IBFImage[];
    area:number;
    startDate:Date;
    endDate?:Date;
    description:string;
}