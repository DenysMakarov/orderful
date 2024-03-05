import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Converter API',
            version: '1.0.0',
            description: 'A service to convert EDI to JSON, XML, and vice versa',
        },
        servers: [
            {
                url: 'http://localhost:5100/api',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
