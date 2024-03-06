import app from './app';
import dotenv from 'dotenv';
const env = process.env.NODE_ENV;
const envPath = env ? `.env.${env}` : '.env';
dotenv.config({ path: envPath });


const PORT: number = parseInt(process.env.PORT as string) || 5100;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
