/// <reference types="multer" />
export declare class StorageController {
    upload(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
    }>;
    seeUploadedFile(file: string, res: any): any;
}
