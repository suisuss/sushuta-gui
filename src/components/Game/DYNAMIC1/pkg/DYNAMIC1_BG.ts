import * as wasm from './DYNAMIC1_BG';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? ((0 as any), module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0;
function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array((wasm as any).memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
*/
export function greet() {
    (wasm as any).greet();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        (wasm as any).__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
export const Movement = Object.freeze({ TOP:0,"0":"TOP",RIGHT:1,"1":"RIGHT",DOWN:2,"2":"DOWN",LEFT:3,"3":"LEFT", });
/**
*/
export class Game {
    ptr: any;

    static __wrap(ptr) {
        const obj = Object.create(Game.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        (wasm as any).__wbg_game_free(ptr);
    }
    /**
    */
    get width() {
        const ret = (wasm as any).__wbg_get_game_width(this.ptr);
        return ret;
    }
    /**
    */
    set width(arg0) {
        (wasm as any).__wbg_set_game_width(this.ptr, arg0);
    }
    /**
    */
    get height() {
        const ret = (wasm as any).__wbg_get_game_height(this.ptr);
        return ret;
    }
    /**
    */
    set height(arg0) {
        (wasm as any).__wbg_set_game_height(this.ptr, arg0);
    }
    /**
    */
    get speed() {
        const ret = (wasm as any).__wbg_get_game_speed(this.ptr);
        return ret;
    }
    /**
    */
    set speed(arg0) {
        (wasm as any).__wbg_set_game_speed(this.ptr, arg0);
    }
    /**
    */
    get direction() {
        const ret = (wasm as any).__wbg_get_game_direction(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    */
    set direction(arg0) {
        _assertClass(arg0, Vector);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        (wasm as any).__wbg_set_game_direction(this.ptr, ptr0);
    }
    /**
    */
    get food() {
        const ret = (wasm as any).__wbg_get_game_food(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    */
    set food(arg0) {
        _assertClass(arg0, Vector);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        (wasm as any).__wbg_set_game_food(this.ptr, ptr0);
    }
    /**
    */
    get score() {
        const ret = (wasm as any).__wbg_get_game_score(this.ptr);
        return ret;
    }
    /**
    */
    set score(arg0) {
        (wasm as any).__wbg_set_game_score(this.ptr, arg0);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} speed
    * @param {number} snake_length
    * @param {Vector} direction
    */
    constructor(width, height, speed, snake_length, direction) {
        _assertClass(direction, Vector);
        var ptr0 = direction.ptr;
        direction.ptr = 0;
        const ret = (wasm as any).game_new(width, height, speed, snake_length, ptr0);
        return Game.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    is_over() {
        const ret = (wasm as any).game_is_over(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {number} timespan
    * @param {number | undefined} movement
    */
    process(timespan, movement) {
        (wasm as any).game_process(this.ptr, timespan, isLikeNone(movement) ? 4 : movement);
    }
    /**
    * @returns {Array<any>}
    */
    get_snake() {
        const ret = (wasm as any).game_get_snake(this.ptr);
        return takeObject(ret);
    }
}
/**
*/
export class Vector {
    ptr: any

    static __wrap(ptr) {
        const obj = Object.create(Vector.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        (wasm as any).__wbg_vector_free(ptr);
    }
    /**
    */
    get x() {
        const ret = (wasm as any).__wbg_get_vector_x(this.ptr);
        return ret;
    }
    /**
    */
    set x(arg0) {
        (wasm as any).__wbg_set_vector_x(this.ptr, arg0);
    }
    /**
    */
    get y() {
        const ret = (wasm as any).__wbg_get_vector_y(this.ptr);
        return ret;
    }
    /**
    */
    set y(arg0) {
        (wasm as any).__wbg_set_vector_y(this.ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        const ret = (wasm as any).vector_new(x, y);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} other
    * @returns {Vector}
    */
    add(other) {
        _assertClass(other, Vector);
        const ret = (wasm as any).vector_add(this.ptr, other.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} other
    * @returns {Vector}
    */
    subtract(other) {
        _assertClass(other, Vector);
        const ret = (wasm as any).vector_subtract(this.ptr, other.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {number} number
    * @returns {Vector}
    */
    scale_by(number) {
        const ret = (wasm as any).vector_scale_by(this.ptr, number);
        return Vector.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    length() {
        const ret = (wasm as any).vector_length(this.ptr);
        return ret;
    }
    /**
    * @returns {Vector}
    */
    normalize() {
        const ret = (wasm as any).vector_normalize(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} other
    * @returns {boolean}
    */
    equal_to(other) {
        _assertClass(other, Vector);
        const ret = (wasm as any).vector_equal_to(this.ptr, other.ptr);
        return ret !== 0;
    }
    /**
    * @param {Vector} other
    * @returns {boolean}
    */
    is_opposite(other) {
        _assertClass(other, Vector);
        const ret = (wasm as any).vector_is_opposite(this.ptr, other.ptr);
        return ret !== 0;
    }
    /**
    * @param {Vector} other
    * @returns {number}
    */
    dot_product(other) {
        _assertClass(other, Vector);
        const ret = (wasm as any).vector_dot_product(this.ptr, other.ptr);
        return ret;
    }
}

export function __wbg_vector_new(arg0) {
    const ret = Vector.__wrap(arg0);
    return addHeapObject(ret);
};

export function __wbg_alert_300f1c634d02c7e5(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_randomFillSync_d2ba53160aec6aba(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

export function __wbg_getRandomValues_e57c9b75ddead065(arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
};

export function __wbg_self_86b4b13392c7af56() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_crypto_b8c92eaac23d0d80(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export function __wbg_msCrypto_9ad6677321a08dd8(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_require_f5521a5b85ad2542(arg0, arg1, arg2) {
    const ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
};

export function __wbg_getRandomValues_dd27e6b0652b3236(arg0) {
    const ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

export function __wbg_static_accessor_MODULE_452b4680e8614c81() {
    const ret = module;
    return addHeapObject(ret);
};

export function __wbg_new_2ab697f1555e0dbc() {
    const ret = new Array();
    return addHeapObject(ret);
};

export function __wbg_push_811c8b08bf4ff9d5(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export function __wbg_buffer_de1150f91b23aa89(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_new_97cf52648830a70d(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_set_a0172b213e2469e9(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export function __wbg_length_e09c0b925ab8de5d(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_newwithlength_e833b89f9db02732(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_subarray_9482ae5cd5cd99d3(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = (wasm as any).memory;
    return addHeapObject(ret);
};

cachedUint8Memory0 = new Uint8Array((wasm as any).memory.buffer);

