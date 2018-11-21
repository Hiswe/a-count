'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var flow = _interopDefault(require('lodash.flow'));
var isObject = _interopDefault(require('lodash.isobject'));
var cloneDeep = _interopDefault(require('lodash.clonedeep'));
var merge = _interopDefault(require('lodash.merge'));
var shortid = _interopDefault(require('shortid'));

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
        .map(function (entry) { return merge(defaultObject, entry); })
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
// • de-dupe defaultProduct lines
// • check _id for React
function removeDefaultProducts(quotation) {
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
    quotation = merge(quotation, { products: cleanedProducts });
    return quotation;
}
function recomputeTotals(quotation) {
    if (!Array.isArray(quotation.products))
        return quotation;
    var totals$$1 = totals(quotation);
    return merge(quotation, totals$$1);
}
// • add an empty line a the end…
//   …in case a user just type something on the blank one
function addEmptyLine(quotation) {
    var defaultProduct = quotation.productConfig;
    var products = quotation.products;
    if (!Array.isArray(products))
        return quotation;
    if (!isObject(defaultProduct))
        return quotation;
    var emptyProduct = merge(defaultProduct, { checked: true, description: "" });
    quotation.products.push(emptyProduct);
    return quotation;
}
function ensureProductId(quotation) {
    var products = quotation.products;
    if (!Array.isArray(products))
        return quotation;
    quotation.products = products.map(function (product) {
        if (!product._id)
            product._id = shortid();
        return product;
    });
    return quotation;
}
var products = flow(cloneQuotation, removeDefaultProducts, recomputeTotals, addEmptyLine, ensureProductId);
var all = flow(cloneQuotation, steps, removeDefaultProducts, recomputeTotals, addEmptyLine, ensureProductId);

exports.computeTotals = totals;
exports.computeProductTotal = productTotal;
exports.enforceNumber = enforceNumber;
exports.filterArrayWithObject = filterArrayWithObject;
exports.computeQuotationProducts = products;
exports.computeQuotation = all;
