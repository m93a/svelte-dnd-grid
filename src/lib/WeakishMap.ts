
export class WeakishMap<K, V> implements Map<K, V> {
    strongMap = new Map<K, V>();
    weakMap = new WeakMap<K & object, V>();

    [Symbol.toStringTag] = 'WeakishMap';

    isWeakKey(key: K): key is K & object {
        return typeof key === 'object' || typeof key === 'function';
    }

    clear() {
        this.strongMap.clear();
        this.weakMap = new WeakMap();
    }

    delete(key: K): boolean {
        return this.isWeakKey(key) ? this.weakMap.delete(key) : this.strongMap.delete(key);
    }

    get(key: K): V | undefined {
        return this.isWeakKey(key) ? this.weakMap.get(key) : this.strongMap.get(key);
    }

    has(key: K): boolean {
        return this.isWeakKey(key) ? this.weakMap.has(key) : this.strongMap.has(key);
    }

    set(key: K, value: V): this {
        this.isWeakKey(key) ? this.weakMap.set(key, value) : this.strongMap.set(key, value);
        return this;
    }

    /** @deprecated */
    entries(): IterableIterator<[K, V]> {
        return this.strongMap.entries();
    }

    /** @deprecated  */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: unknown): void {
        this.strongMap.forEach(callbackfn, thisArg);
    }

    /** @deprecated */
    keys(): IterableIterator<K> {
        return this.strongMap.keys();
    }

    /** @deprecated */
    get size() { return this.strongMap.size };

    /** @deprecated */
    values(): IterableIterator<V> {
        return this.strongMap.values();
    }

    /** @deprecated */
    [Symbol.iterator](): never {
        throw new TypeError("Cannot iterate a WeakishMap. To iterate strong keys only, use keys() or entries().");
    }
}
