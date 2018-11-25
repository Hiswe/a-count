declare const _default: {
    reference: string;
    tax: number;
    _hasInvoice: boolean;
    _canBeArchived: boolean;
    _canCreateInvoice: boolean;
    id: string;
    name: string;
    index: number;
    products: ({
        description: string;
        quantity: number;
        price: number;
        checked: boolean;
        total: number;
        _id: string;
    } | {
        description: string;
        quantity: number;
        price: number;
        checked: boolean;
        _id: string;
        total?: undefined;
    } | {
        description: string;
        quantity: number;
        price: number;
        checked: boolean;
        total?: undefined;
        _id?: undefined;
    })[];
    totalNet: number;
    totalTax: number;
    total: number;
    sendAt: string;
    validatedAt: any;
    signedAt: any;
    archivedAt: any;
    mentions: any;
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
        checked: boolean;
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
};
export default _default;
