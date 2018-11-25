import { Quotation } from '@acount/types';
import { DisplayQuotation } from '../types';
export declare function cloneQuotation(quotation: Quotation): Quotation;
export declare function steps(quotation: Quotation): DisplayQuotation;
export declare function recomputeTotals(quotation: DisplayQuotation): DisplayQuotation;
export declare const products: (a1: Quotation) => DisplayQuotation;
export declare const all: (a1: Quotation) => DisplayQuotation;
