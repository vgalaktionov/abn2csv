import { Transaction } from './parsers';

export const csvWriter = (rows: Transaction[]) => {
    return ['id,date,payee,amount,currency']
        .concat(
            rows.map(
                (r) =>
                    `${r.id},${r.date.toLocaleDateString('en-GB')},${r.description.replaceAll(',', '')},${r.amount},${
                        r.currency
                    }`,
            ),
        )
        .join('\r\n');
};
