import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StorageController } from './storage.controller';
import { extension } from "mime-types";
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: "./uploads",
        filename: function (req, { filename, mimetype }, cb) {
          const file = Buffer.from(`${filename}_${Date.now()}`).toString('base64url') + `.${extension(mimetype)}`;
          cb(null, file);
        }
      }),
    }),
  ],
  controllers: [StorageController]
})
export class StorageModule { }
