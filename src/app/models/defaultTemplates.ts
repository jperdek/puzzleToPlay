export interface TemplateCategory {
    name: string;
    images: TemplateImage[];
}

export interface TemplateImage {
    title: string;
    quality: string;
    src: string;
}
