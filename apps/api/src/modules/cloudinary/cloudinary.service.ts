import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
@Injectable()
export class CloudinaryService {
  constructor(
    private readonly configService: ConfigService,
  ) {
    const cloudName =
      this.configService.getOrThrow<string>(
        'cloudinary.cloudName',
      );

    const apiKey =
      this.configService.getOrThrow<string>(
        'cloudinary.apiKey',
      );

    const apiSecret =
      this.configService.getOrThrow<string>(
        'cloudinary.apiSecret',
      );


    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }


  uploadBuffer(
    buffer: Buffer,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder,
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) {
              console.error(
                'Cloudinary Upload Error:',
                {
                  message: error.message,
                  http_code: error.http_code,
                  name: error.name,
                },
              );

              return reject(error);
            }

            if (!result) {
              return reject(
                new Error(
                  'Cloudinary upload failed',
                ),
              );
            }

            resolve(result);
          },
        );

      stream.end(buffer);
    });
  }

}

