require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
import app from './app';
import dotenv from 'dotenv';
dotenv.config();



const PORT: number = parseInt(process.env.PORT as string) || 5100;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
