import { ICategory } from "./categories";
import { IFile } from "./file";

interface IImageData {
  image: string;
  id: string;
}

export interface ImageInfo {
  name: string;
  pictureId: IImageData;
}
export interface ImageEnInfo {
  nameEn?: string;
  pictureIdEn: IImageData;
}
export interface ImageArInfo {
  nameAr?: string;
  pictureIdAr: IImageData;
}

export interface ImageInfoPayload {
  name: string;
  pictureId: string;
}
export interface ImageEnInfoPayload {
  nameEn: string;
  pictureIdEn: string;
}
export interface ImageArInfoPayload {
  nameAr: string;
  pictureIdAr: string;
}

export interface ImageItem {
  before: ImageInfo;
  after: ImageInfo;
  _id: string;
}

export interface ImageEnItem {
  beforeEn: ImageEnInfo;
  afterEn: ImageEnInfo;
  _id: string;
}

export interface ImageArItem {
  beforeAr: ImageArInfo;
  afterAr: ImageArInfo;
  _id: string;
}

export interface ImageItemPayload {
  before: ImageInfoPayload;
  after: ImageInfoPayload;
  id?: string;
}
export interface ImageEnItemPayload {
  beforeEn: ImageEnInfoPayload;
  afterEn: ImageEnInfoPayload;
  id?: string;
}
export interface ImageArItemPayload {
  beforeAr: ImageArInfoPayload;
  afterAr: ImageArInfoPayload;
  id?: string;
}

export interface IStepItemPayload {
  name: string;
  pictureId: string;
  alt: string;
  description: string;
  isActive: boolean;
  video?: string;
  id?: string;
}

export interface ITranslatedStepItemPayload {
  nameEn: string;
  nameAr: string;
  pictureIdEn: string;
  pictureIdAr: string;
  altEn: string;
  altAr: string;
  descriptionEn: string;
  descriptionAr: string;
  isActiveEn: boolean;
  isActiveAr: boolean;
  videoEn: string;
  videoAr: string;
  id?: string;
}

export interface IStep {
  name: string;
  pictureId: IFile;
  alt: string;
  description: string;
  isActive: boolean;
  video?: string;
  id?: string;
}

export interface IStepEn {
  nameEn: string;
  altEn: string;
  descriptionEn: string;
  isActiveEn: boolean;
  videoEn?: string;
  _idEn?: string;
  pictureIdEn: IFile;
}
export interface IStepAr {
  nameAr: string;
  altAr: string;
  descriptionAr: string;
  isActiveAr: boolean;
  videoAr?: string;
  _idAr?: string;
  pictureIdAr: IFile;
}

export interface IProject {
  id: string;
  title: string;
  titleEn: string;
  titleAr: string;
  categoryId: ICategory;
  pictureId: IFile;
  images: ImageItem[];
  alt: string;
  altEn: string;
  altAr: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  isActive: boolean;
  artitectureStyle?: string;
  artitectureStyleEn?: string;
  artitectureStyleAr?: string;
  address: string;
  addressEn?: string;
  addressAr?: string;
  createdAt: number;
  updatedAt: number;
  video?: string;
  steps: IStep[];
  stepsEn: IStepEn[];
  stepsAr: IStepAr[];
  imagesEn: ImageEnItem[];
  imagesAr: ImageArItem[];
}

export interface IProjectPayload {
  title: string;
  categoryId: string;
  pictureId: string;
  images: ImageItemPayload[];
  steps: IStepItemPayload[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
  artitectureStyle?: string;
  address: string;
  video?: string;
  titleEn?: string;
  titleAr?: string;
  altEn?: string;
  altAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  artitectureStyleEn?: string;
  artitectureStyleAr?: string;
  addressEn?: string;
  addressAr?: string;
}

export interface IUpdateProjectPayload extends IProjectPayload {
  id: string;
}

export interface IProjectParams {
  page: number;
  limit: number;
  asc?: boolean;
  sort?: string;
}

export interface IProjectWithSuggestions {
  project: IProject;
  suggestions: IProject[];
}

export enum IProjectType {
  Steps = "steps",
  BeforeAfter = "beforeAfter",
}

export type TProjectTranslatePayload = {
  title: string;
  alt: string;
  artitectureStyle?: string;
  description: string;
  address: string;
  images: ImageItemPayload[];
  steps: IStepItemPayload[];
};

const test = {
  titleEn: "Apadana Isfahan",
  titleAr: "آپادانا اصفهان",
  altEn: "Apadana Isfahan",
  altAr: "آپادانا اصفهان",
  descriptionEn:
    "The Apadana Isfahan project, with an area of 112 meters, was renovated in 1399 in a modern architectural style. In this project, due to the lack of sufficient lighting before renovation, measures were taken to create appropriate illumination. Additionally, the depth of the closet was more than necessary, so it was demolished and added to the living room space, and a mirror was used on its body so that the space appeared larger than it was. In this project, modern track lights, an electric fireplace, high-gloss Turkish cabinets, 100*100 tiles, a ceramic counter, a wall unit, etc., were used.",
  descriptionAr:
    "مشروع آپادانا اصفهان، بمساحة 112 مترًا، تم تجديده في عام 1399 بأسلوب معماري حديث. في هذا المشروع، ونظرًا لعدم توفر إضاءة كافية قبل التجديد، تم اتخاذ إجراءات لتوفير إضاءة مناسبة. بالإضافة إلى ذلك، كان عمق خزانة الملابس أكثر من اللازم، لذا تم هدمها وإضافتها إلى مساحة غرفة المعيشة، واستُخدمت مرآة على جسمها لتبدو المساحة أكبر مما كانت عليه. تم استخدام أضواء المسار الحديثة، والمدفأة الكهربائية، وخزائن تركية عالية اللمعان، وسيراميك 100*100، وكونتر سيراميك، ووحدة حائط، وما إلى ذلك في هذا المشروع.",
  addressEn: "Apadana Isfahan",
  addressAr: "أبادانا اصفهان",
  imagesEn: [
    {
      afterEn: {
        nameEn: "After",
        pictureIdEn: "6a7b2744fc734480f638978c",
      },
      beforeEn: {
        nameEn: "Before",
        pictureIdEn: "6a7b2732fc734480f6389788",
      },
    },
    {
      afterEn: {
        nameEn: "Room After",
        pictureIdEn: "6a7b2782fc734480f6389794",
      },
      beforeEn: {
        nameEn: "Room Before",
        pictureIdEn: "6a7b276cfc734480f6389790",
      },
    },
  ],
  stepsEn: [
    {
      nameEn: "First Step",
      pictureIdEn: "6a5e556fe791850dd75b327d",
      altEn: "bispsy",
      isActiveEn: true,
      videoEn: "fdsfdsfds",
      descriptionEn: "First Step description",
      _idEn: "6a6140dca38c13ffebf75e32",
    },
    {
      nameEn: "Second Step ",
      pictureIdEn: "6a5e557fe791850dd75b3281",
      altEn: "Second step description image",
      isActiveEn: "1",
      videoEn: "4353",
      descriptionEn: "Second step description",
      _idEn: "6a6140dca38c13ffebf75e33",
    },
  ],
  stepsAr: [],
  artitectureStyleEn: "",
  artitectureStyleAr: "",
};

export interface ITranslatedProjectPayload {
  titleEn: string;
  titleAr: string;
  imagesEn: ImageEnItemPayload[];
  imagesAr: ImageArItemPayload[];
  altEn: string;
  altAr: string;
  descriptionEn: string;
  descriptionAr: string;
  artitectureStyleEn?: string;
  artitectureStyleAr?: string;
  addressEn: string;
  addressAr: string;
  stepsEn: ITranslatedStepItemPayload[];
  stepsAr: ITranslatedStepItemPayload[];
}
