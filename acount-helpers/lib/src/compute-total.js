export function roundToNearestQuarter(number) {
    var rounded = Math.round(number * 4) / 4;
    return parseFloat(rounded.toFixed(2));
}
export function enforceNumber(number) {
    number = typeof number !== "number" ? parseFloat(number) : number;
    return isNaN(number) ? 0 : number;
}
export function productTotal(product) {
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
export function totals(document) {
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
