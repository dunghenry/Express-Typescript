import * as fs from 'fs/promises';
import { format } from 'date-fns';
import path from 'path';
const fileName = path.join(__dirname, '../logs', 'logs.log');
const logEvents = async (msg, path) => {
    const indexStr = path.indexOf('src')
    const pathName = path.slice(indexStr);
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime} - ${msg} - ${pathName}\n`;
    try {
        await fs.appendFile(fileName, contentLog);
    } catch (error) {
        console.log(error);
    }
}

export default logEvents;