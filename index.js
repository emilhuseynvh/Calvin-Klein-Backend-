const express = require('express');
const config = require('./src/config');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
require('./src/config/database');
const router = require('./src/routes');
const path = require('path');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

const uploadPath = path.join(__dirname, "../upload");
app.use("/upload", express.static(uploadPath));

app.use(errorMiddleware);

app.listen(config.port, () => {
    console.log(`application is runnning on http://localhost:${config.port}`);
});