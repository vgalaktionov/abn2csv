import * as PDFJS from 'pdfjs-dist';
import { PDFPageProxy, TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

function renderPage(pageData: PDFPageProxy) {
    //check documents https://mozilla.github.io/pdf.js/
    //ret.text = ret.text ? ret.text : "";

    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false,
    };

    return pageData.getTextContent(render_options).then(function (textContent: TextContent) {
        let lastY,
            text = '';

        for (const item of textContent.items as TextItem[]) {
            if (lastY == item.transform[5] || !lastY) {
                text += item.str;
            } else {
                text += '\n' + item.str;
            }
            lastY = item.transform[5];
        }

        return text;
    });
}

export async function pdf(dataBuffer: Buffer) {
    PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
    const doc = await PDFJS.getDocument(dataBuffer).promise;

    let text = '';

    for (let i = 1; i <= doc.numPages; i++) {
        const pageText = await doc
            .getPage(i)
            .then((pageData) => renderPage(pageData))
            .catch((err) => {
                // todo log err using debug
                debugger;
                return '';
            });

        text = `${text}\n\n${pageText}`;
    }

    doc.destroy();

    return text;
}
