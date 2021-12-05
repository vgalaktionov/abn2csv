import md5 from 'crypto-js/md5';
import * as mt940 from 'mt940-js';
import { pdf } from './pdf';

export interface Transaction {
    id: string;
    date: Date;
    description: string;
    currency: string;
    amount: number;
}

async function mt940Parser(fileContents: ArrayBuffer) {
    const statements = await mt940.read(fileContents);
    return statements
        .flatMap((st) => st.transactions)
        .map(({ id, isCredit, amount, valueDate, currency, description }) => ({
            id,
            currency,
            description,
            date: new Date(valueDate),
            amount: amount * (isCredit ? 1 : -1),
        }));
}

function monthParser(month: string) {
    let monthNum: number;
    switch (month) {
        case 'jan':
            monthNum = 0;
            break;
        case 'feb':
            monthNum = 1;
            break;
        case 'mrt':
            monthNum = 2;
            break;
        case 'apr':
            monthNum = 3;
            break;
        case 'mei':
            monthNum = 4;
            break;
        case 'jun':
            monthNum = 5;
            break;
        case 'jul':
            monthNum = 6;
            break;
        case 'aug':
            monthNum = 7;
            break;
        case 'sep':
            monthNum = 8;
            break;
        case 'okt':
            monthNum = 9;
            break;
        case 'nov':
            monthNum = 10;
            break;
        case 'dec':
            monthNum = 11;
            break;
        default:
            throw new Error(`invalid month: ${month}`);
    }
    return monthNum;
}

function dayParser(day: string) {
    return +day.replace('0', '');
}

function pdfDateParser(statementDate: string, year: number) {
    const [dayOfMonth, month] = statementDate.trim().split(' ');
    const day = dayParser(dayOfMonth);

    const monthNum = monthParser(month);

    const date = new Date(year, monthNum, day);
    if (date > new Date()) date.setFullYear(year - 1);

    if (isNaN(date.getTime())) throw new Error(`invalid date: ${statementDate} ${year}`);

    return date;
}

async function pdfParser(fileContents: Buffer) {
    const parsed = await pdf(fileContents);

    const statementDate = parsed.match(/(?<date>\d{1,2} [a-z]+ \d{4})/gm)?.[0];
    if (!statementDate) throw new Error('invalid file format');
    const [_day, _month, year] = statementDate.split(' ');

    const negativeTransactioRegex =
        /(?<date>\d{2} [a-z]{3})\s*(?<dateBooked>\d{2} [a-z]{3})(?<description>.*)(?<country>[A-Z]{3})\s*(?<originalAmount>(\d{1,3}(,|\.))+\d{2})?\s*(?<amount>(\d{1,3}(,|\.))+\d{2})\s*Af/gm;
    const positiveTransactionRegex =
        /(?<date>\d{2} [a-z]{3})\s*(?<dateBooked>\d{2} [a-z]{3})(?<description>.*?)(?<amount>(\d{1,3}(,|\.))+\d{2})\s*Bij/gm;

    const transactions: Transaction[] = [];

    const parseRow = (match: Record<string, string>, sign: 1 | -1): Transaction => {
        const date = pdfDateParser(match['date'], +year);
        const description = match['description'];
        const currency = match['currency'] ?? 'EUR';
        const amount = +match['amount'].replace('.', '').replace(',', '.') * sign;
        const id = md5(`${date}${description}${amount}${currency}`).toString();
        return { id, date, description, currency, amount };
    };

    for (const row of parsed.split('\n')) {
        let match: Record<string, string> | undefined;

        if ((match = positiveTransactionRegex.exec(row)?.groups)) {
            transactions.push(parseRow(match, 1));
        } else if ((match = negativeTransactioRegex.exec(row)?.groups)) {
            transactions.push(parseRow(match, -1));
        }
    }
    return transactions;
}

export async function parseFile(file: File): Promise<Transaction[]> {
    const fileContents = await new Promise<ArrayBuffer>((res, rej) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                res(reader.result as ArrayBuffer);
            };
            reader.onerror = rej;
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error(error);
            rej(error);
        }
    });

    switch (file.type) {
        case '':
        case 'application/octet-stream':
            return mt940Parser(fileContents);
        case 'application/pdf':
            return pdfParser(toBuffer(fileContents));
        default:
            throw new Error(`mimetype ${file.type} not supported!`);
    }
}

function toBuffer(ab: ArrayBuffer) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
