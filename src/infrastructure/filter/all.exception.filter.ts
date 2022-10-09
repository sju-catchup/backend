import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

type IResponse = {
  statusCode: number;
  message: string;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let statusCode: number;
    let responseBody: IResponse;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = {
        statusCode,
        message: this.extractMessageInHttpException(exception),
      };
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode,
        message: this.extractMessageInUnKnwon(exception),
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
  extractMessageInHttpException(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse == 'object') {
      const message = exceptionResponse['message'] ?? null;
      if (typeof message == 'string') {
        return message;
      } else if (message.constructor === Array && message.length > 0) {
        return message[0];
      }
    }
    return exception.message;
  }
  extractMessageInUnKnwon(exception: unknown): string {
    if (
      !!exception &&
      typeof exception === 'object' &&
      'message' in exception
    ) {
      const message = exception['message'];
      if (typeof message == 'string') {
        return message;
      }
    }
    return '예상하지 못한 에러가 발생했습니다.';
  }
}
