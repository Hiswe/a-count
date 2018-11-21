import { Quotation } from '@acount/types';
export interface Step {
    key: string;
    label: string;
    value?: any;
}
export declare type Steps = Step[];
export interface DisplayQuotation extends Quotation {
    steps: Steps;
}
export declare function cloneQuotation(quotation: Quotation): Quotation;
export declare function steps(quotation: Quotation): DisplayQuotation;
export declare function removeDefaultProducts(quotation: Quotation): Quotation;
export declare function recomputeTotals(quotation: Quotation): Quotation;
export declare function addEmptyLine(quotation: Quotation): Quotation;
export declare function ensureProductId(quotation: Quotation): Quotation;
export declare function computeProductsTotal(quotation: Quotation): Quotation;
export declare function setProductsFormPath(quotation: Quotation): Quotation;
export declare const products: (a1: Quotation) => Quotation;
export declare const all: (a1: Quotation) => Quotation;
