import { Transaction } from './parsers';

export const csvWriter = (rows: Transaction[]) => {
    return ['id,date,description,currency,amount,conversionRate']
        .concat(
            rows.map(
                (r) =>
                    `${r.id},${r.date.toLocaleDateString('en-GB')},${r.description},${r.currency},${r.amount},${
                        r.conversionRate ?? ''
                    }`,
            ),
        )
        .join('\r\n');
};
