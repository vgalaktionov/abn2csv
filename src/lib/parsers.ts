import md5 from 'crypto-js/md5';
import * as mt940 from 'mt940-js';
import { pdf } from './pdf';

export interface Transaction {
    id: string;
    date: Date;
    description: string;
    currency: string;
    amount: number;
    conversionRate?: number;
}

async function mt940Parser(fileContents: ArrayBuffer) {
    const statements = await mt940.read(fileContents);
    return statements
        .flatMap((st) => st.transactions)
        .map(({ id, isExpense, amount, valueDate, currency, description }) => ({
            id,
            currency,
            description,
            date: new Date(valueDate),
            amount: amount * (isExpense ? -1 : 1),
        }));
}

async function pdfParser(fileContents: Buffer) {
    const parsed = await pdf(fileContents);

    const statementDate = parsed.match(/(?<date>\d{1,2} [a-z]+ \d{4})/gm)?.[0];
    if (!statementDate) throw new Error('invalid file format');
    const year = new Date(statementDate).getFullYear();

    const negativeTransactioRegex =
        /(?<date>\d{2} [a-z]{3})(?<dateBooked>\d{2} [a-z]{3})(?<description>.*)(?<country>[A-Z]{3})(?<originalAmount>(\d{1,3}(,|\.))+\d{2})?(?<amount>(\d{1,3}(,|\.))+\d{2})Af/;
    const positiveTransactionRegex =
        /(?<date>\d{2} [a-z]{3})(?<dateBooked>\d{2} [a-z]{3})(?<description>.*?)(?<amount>(\d{1,3}(,|\.))+\d{2})Bij/;
    const exchangeRateRegex = /(?<rate>(\d{1,3}(,|\.))+\d+)Wisselkoers (?<currency>[A-Z]{3})/gm;

    const transactions: Transaction[] = [];
    let exchangeRateExpected = false;

    const parseRow = (match: Record<string, string>, sign: 1 | -1): Transaction => {
        const date = new Date(`${match['date']} ${year}`);
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
            if (match['originalAmount']) exchangeRateExpected = true;
        } else if (exchangeRateExpected && (match = exchangeRateRegex.exec(row)?.groups)) {
            const transaction = transactions[transactions.length - 1];
            transaction.conversionRate = +match['rate'].replace('.', '').replace(',', '.');
            transaction.currency = match['currency'];
            exchangeRateExpected = false;
        }
    }
    return transactions;
}

export async function parseFile(mimetype: string, file: File): Promise<Transaction[]> {
    const fileContents = await new Promise<ArrayBuffer>((res, rej) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) res(reader.result as ArrayBuffer);
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            rej(error);
        }
    });

    switch (mimetype) {
        case 'application/octet-stream':
            return mt940Parser(fileContents);
        case 'application/pdf':
            return pdfParser(toBuffer(fileContents));
        default:
            throw new Error(`mimetype ${mimetype} not supported!`);
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
