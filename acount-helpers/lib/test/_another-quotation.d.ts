declare const _default: {
    reference: string;
    tax: number;
    _hasInvoice: boolean;
    _canBeArchived: boolean;
    _canCreateInvoice: boolean;
    id: string;
    name: string;
    index: number;
    products: {
        description: string;
        quantity: number;
        price: number;
        checked: boolean;
        _id: string;
        total: number;
        path: string;
        isEmptyLine: boolean;
    }[];
    totalNet: number;
    totalTax: number;
    total: number;
    sendAt: any;
    validatedAt: any;
    signedAt: any;
    archivedAt: any;
    mentions: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    customerId: string;
    productConfigId: string;
    quotationConfigId: string;
    invoiceId: any;
    productConfig: {
        description: string;
        quantity: number;
        price: number;
    };
    quotationConfig: {
        creationCount: number;
        tax: number;
        prefix: string;
        startAt: number;
        mentions: string;
    };
    customer: {
        id: string;
        name: string;
        address: string;
    };
    invoice: any;
};
export default _default;
