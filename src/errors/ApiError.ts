
class ApiError extends Error {
    status: number;
    message: string;

    constructor(status : number, msg = 'Something wrong with the server') {
        super(msg);
        this.status = status;
        this.message = msg;
    }

    static invalid(message: string): ApiError {
        return new ApiError(400, message);
    }

    static notFound(message: string): ApiError {
        return new ApiError(404, message);
    }

    static conflict(message: string): ApiError {
        return new ApiError(409, message);
    }

    static forbidden(message: string): ApiError {
        return new ApiError(403, message);
    }

    static serverError(message: string): ApiError {
        return new ApiError(500, message);
    }
}



export default ApiError;
