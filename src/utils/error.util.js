class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "unauthorized") {
        super(message, 401);
    }
}

class DublicateError extends AppError {
    constructor(message = "dublicate") {
        super(message, 409);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = {
    AppError,
    UnauthorizedError,
    DublicateError,
    ValidationError,
    NotFoundError,
};