interface Params<T, K> {
    defaultObject: T;
    array: Array<K>;
}
export declare function filterArrayWithObject<T, K>({ defaultObject, array, }: Params<T, K>): K[];
export default filterArrayWithObject;
