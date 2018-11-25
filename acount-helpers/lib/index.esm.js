import cloneDeep from 'lodash.clonedeep';
import flow from 'lodash.flow';
import isObject from 'lodash.isobject';
import merge from 'lodash.merge';
import shortid from 'shortid';

function roundToNearestQuarter(number) {
    var rounded = Math.round(number * 4) / 4;
    return parseFloat(rounded.toFixed(2));
}
function enforceNumber(number) {
    number = typeof number !== "number" ? parseFloat(number) : number;
    return isNaN(number) ? 0 : number;
}
function productTotal(product) {
    if (!product.checked)
        return 0;
    // don't mutate product
    var cleanedProduct = {};
    ["quantity", "price"].forEach(function (key) {
        cleanedProduct[key] = enforceNumber(product[key]);
    });
    var quantity = cleanedProduct.quantity, price = cleanedProduct.price;
    return roundToNearestQuarter(quantity * price);
}
function totals(document) {
    var products = document.products, _a = document.tax, tax = _a === void 0 ? 0 : _a;
    if (!Array.isArray(products))
        return document;
    var taxRate = enforceNumber(tax);
    var totalNet = products.reduce(function (acc, product) { return acc + productTotal(product); }, 0);
    var totalTax = roundToNearestQuarter((totalNet * taxRate) / 100);
    var total = totalNet + totalTax;
    return {
        totalNet: totalNet,
        totalTax: totalTax,
        total: total,
    };
}

function filterArrayWithObject(_a) {
    var defaultObject = _a.defaultObject, array = _a.array;
    if (!Array.isArray(array))
        return [];
    if (!isObject(defaultObject))
        return array;
    var defaultEntries = Object.entries(defaultObject);
    var result = array
        // make sure that the object has the same keys as the comparison
        .map(function (entry) { return merge({}, defaultObject, entry); })
        // To achieve equal comparisons, cast to the same type
        .map(function (entry) {
        defaultEntries.forEach(function (_a) {
            var refKey = _a[0], refValue = _a[1];
            var type = typeof refValue;
            switch (type) {
                case 'number':
                    return (entry[refKey] = parseFloat(entry[refKey]));
                case 'string':
                    return (entry[refKey] = "" + entry[refKey]);
            }
        });
        return entry;
    })
        .filter(function (entry) {
        // check strict equivalence over all the defaultKeys
        var isSameAsDefault = defaultEntries
            .map(function (_a) {
            var refKey = _a[0], refValue = _a[1];
            return refValue === entry[refKey];
        })
            .reduce(function (acc, curr) { return acc && curr; }, true);
        return !isSameAsDefault;
    });
    return result;
}

var EMPTY_PRODUCT_ID = shortid();
function computeDisplayProducts(quotation) {
    var defaultProduct = quotation.productConfig;
    var products = quotation.products;
    if (!Array.isArray(products))
        return quotation;
    if (!isObject(defaultProduct))
        return quotation;
    var cleanedProducts = filterArrayWithObject({
        defaultObject: defaultProduct,
        array: products,
    });
    quotation.products = cleanedProducts.map(function (product, index) {
        return setFormPath(computeDisplayProduct(product), index);
    });
    // • add an empty line a the end…
    //   …in case a user just type something on the blank one
    var emptyProduct = merge({}, defaultProduct, {
        _id: EMPTY_PRODUCT_ID,
        checked: true,
        description: "",
        isEmptyLine: true,
    });
    quotation.products.push(emptyProduct);
    return quotation;
}
function addEmptyLineInformation(product) {
    product.isEmptyLine = false;
    return product;
}
function ensureId(product) {
    if (!product._id)
        product._id = shortid();
    return product;
}
function addTotal(product) {
    product.total = productTotal(product);
    return product;
}
var computeDisplayProduct = flow(addEmptyLineInformation, ensureId, addTotal);
function setFormPath(product, index) {
    product.path = "products[" + index + "]";
    return product;
}

// const STEPS: Steps = Object.freeze([
var STEPS = [
    { key: "sendAt", label: "stepper.sent" },
    { key: "validatedAt", label: "stepper.validated" },
    { key: "signedAt", label: "stepper.signed" },
];
function cloneQuotation(quotation) {
    return cloneDeep(quotation);
}
function steps(quotation) {
    var steps = STEPS.map(function (step) {
        var value = quotation[step.key];
        return {
            value: value,
            key: step.key,
            label: step.label,
        };
    });
    var displayQuotation = merge(quotation, { steps: steps });
    return displayQuotation;
}
function recomputeTotals(quotation) {
    if (!Array.isArray(quotation.products))
        return quotation;
    var totals$$1 = totals(quotation);
    return merge(quotation, totals$$1);
}
var products = flow(cloneQuotation, computeDisplayProducts, recomputeTotals);
var all = flow(cloneQuotation, steps, computeDisplayProducts, recomputeTotals);

export { totals as computeTotals, productTotal as computeProductTotal, enforceNumber, filterArrayWithObject, products as computeQuotationProducts, all as computeQuotation };
