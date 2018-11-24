import { Quotation, Product } from '@acount/types';
export interface Step {
    key: string;
    label: string;
    value?: any;
}
export declare type Steps = Step[];
export interface DisplayProduct extends Product {
    total?: number;
}
export interface DisplayQuotation extends Quotation {
    steps: Steps;
    products: DisplayProduct[];
}
export declare function cloneQuotation(quotation: Quotation): Quotation;
export declare function steps(quotation: Quotation): DisplayQuotation;
export declare function removeDefaultProducts(quotation: DisplayQuotation): DisplayQuotation;
export declare function recomputeTotals(quotation: DisplayQuotation): DisplayQuotation;
export declare function addEmptyLine(quotation: DisplayQuotation): DisplayQuotation;
export declare function ensureProductId(quotation: DisplayQuotation): DisplayQuotation;
export declare function computeProductsTotal(quotation: DisplayQuotation): DisplayQuotation;
export declare function setProductsFormPath(quotation: DisplayQuotation): DisplayQuotation;
export declare const products: (a1: Quotation) => DisplayQuotation;
export declare const all: (a1: Quotation) => DisplayQuotation;
