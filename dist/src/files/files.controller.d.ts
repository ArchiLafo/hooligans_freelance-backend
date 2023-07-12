/// <reference types="multer" />
export declare class FilesController {
    getImage(image: any, res: any): {
        data: any;
    };
    uploadfile(file: any): Express.Multer.File;
}
