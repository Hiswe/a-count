import { Quotation, Product } from '@acount/types';
export declare function roundToNearestQuarter(number: number): number;
export declare function enforceNumber(number: any): number;
interface Totals {
    totalNet: number;
    totalTax: number;
    total: number;
}
export declare function productTotal(product: Product): number;
export declare function totals(document: Quotation): Totals;
export {};
