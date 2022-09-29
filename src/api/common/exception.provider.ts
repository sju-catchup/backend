import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

export type StatusCode = '401' | '404';

export const httpExceptionProvider = (
  statusCode: StatusCode,
  message?: string,
): HttpException => {
  switch (statusCode) {
    case '401':
      return new BadRequestException(message);
    case '404':
      return new NotFoundException(message);

    default:
      return new HttpException(message, parseInt(statusCode));
  }
};
