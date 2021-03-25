import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		const notFound = status === 404 ? "Not Found" : exception.message;

		const errorResponse = {
			status: status,
			timestamp: new Date().toLocaleDateString(),
			path: request.url,
			method: request.method,
			message: notFound,
		};

		Logger.error(`${request.method} ${request.url}`, "", "ExceptionFilter");

		response.status(status).json(errorResponse);
	}
}
