let wasm_bindgen;
(function() {
    const __exports = {};
    let wasm;

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

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0;
function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
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
__exports.greet = function() {
    wasm.greet();
};

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
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
__exports.Movement = Object.freeze({ TOP:0,"0":"TOP",RIGHT:1,"1":"RIGHT",DOWN:2,"2":"DOWN",LEFT:3,"3":"LEFT", });
/**
*/
class Game {

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
        wasm.__wbg_game_free(ptr);
    }
    /**
    */
    get width() {
        const ret = wasm.__wbg_get_game_width(this.ptr);
        return ret;
    }
    /**
    */
    set width(arg0) {
        wasm.__wbg_set_game_width(this.ptr, arg0);
    }
    /**
    */
    get height() {
        const ret = wasm.__wbg_get_game_height(this.ptr);
        return ret;
    }
    /**
    */
    set height(arg0) {
        wasm.__wbg_set_game_height(this.ptr, arg0);
    }
    /**
    */
    get speed() {
        const ret = wasm.__wbg_get_game_speed(this.ptr);
        return ret;
    }
    /**
    */
    set speed(arg0) {
        wasm.__wbg_set_game_speed(this.ptr, arg0);
    }
    /**
    */
    get direction() {
        const ret = wasm.__wbg_get_game_direction(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    */
    set direction(arg0) {
        _assertClass(arg0, Vector);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_game_direction(this.ptr, ptr0);
    }
    /**
    */
    get reward() {
        const ret = wasm.__wbg_get_game_reward(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    */
    set reward(arg0) {
        _assertClass(arg0, Vector);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_game_reward(this.ptr, ptr0);
    }
    /**
    */
    get score() {
        const ret = wasm.__wbg_get_game_score(this.ptr);
        return ret;
    }
    /**
    */
    set score(arg0) {
        wasm.__wbg_set_game_score(this.ptr, arg0);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} speed
    * @param {Vector} direction
    */
    constructor(width, height, speed, direction) {
        _assertClass(direction, Vector);
        var ptr0 = direction.ptr;
        direction.ptr = 0;
        const ret = wasm.game_new(width, height, speed, ptr0);
        return Game.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    is_over() {
        const ret = wasm.game_is_over(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {number} timespan
    * @param {number | undefined} movement
    */
    process(timespan, movement) {
        wasm.game_process(this.ptr, timespan, isLikeNone(movement) ? 4 : movement);
    }
    /**
    * @returns {Array<any>}
    */
    get_player() {
        const ret = wasm.game_get_player(this.ptr);
        return takeObject(ret);
    }
}
__exports.Game = Game;
/**
*/
class Vector {

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
        wasm.__wbg_vector_free(ptr);
    }
    /**
    */
    get x() {
        const ret = wasm.__wbg_get_vector_x(this.ptr);
        return ret;
    }
    /**
    */
    set x(arg0) {
        wasm.__wbg_set_vector_x(this.ptr, arg0);
    }
    /**
    */
    get y() {
        const ret = wasm.__wbg_get_vector_y(this.ptr);
        return ret;
    }
    /**
    */
    set y(arg0) {
        wasm.__wbg_set_vector_y(this.ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        const ret = wasm.vector_new(x, y);
        console.log(ret)
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} other
    * @returns {Vector}
    */
    add(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_add(this.ptr, other.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} other
    * @returns {Vector}
    */
    subtract(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_subtract(this.ptr, other.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {number} number
    * @returns {Vector}
    */
    scale_by(number) {
        const ret = wasm.vector_scale_by(this.ptr, number);
        return Vector.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    length() {
        const ret = wasm.vector_length(this.ptr);
        return ret;
    }
    /**
    * @returns {Vector}
    */
    normalize() {
        const ret = wasm.vector_normalize(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} other
    * @returns {boolean}
    */
    equal_to(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_equal_to(this.ptr, other.ptr);
        return ret !== 0;
    }
    /**
    * @param {Vector} other
    * @returns {boolean}
    */
    is_opposite(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_is_opposite(this.ptr, other.ptr);
        return ret !== 0;
    }
    /**
    * @param {Vector} other
    * @returns {number}
    */
    dot_product(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_dot_product(this.ptr, other.ptr);
        return ret;
    }
}
__exports.Vector = Vector;

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_vector_new = function(arg0) {
        const ret = Vector.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_alert_d490ded3d4032306 = function(arg0, arg1) {
        alert(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_randomFillSync_d2ba53160aec6aba = function(arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_getRandomValues_e57c9b75ddead065 = function(arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    };
    imports.wbg.__wbg_self_86b4b13392c7af56 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_crypto_b8c92eaac23d0d80 = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_msCrypto_9ad6677321a08dd8 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_require_f5521a5b85ad2542 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_dd27e6b0652b3236 = function(arg0) {
        const ret = getObject(arg0).getRandomValues;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_static_accessor_MODULE_452b4680e8614c81 = function() {
        const ret = module;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_2ab697f1555e0dbc = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_811c8b08bf4ff9d5 = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_buffer_de1150f91b23aa89 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_97cf52648830a70d = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a0172b213e2469e9 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_e09c0b925ab8de5d = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_e833b89f9db02732 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_9482ae5cd5cd99d3 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);


    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        let src;
        if (typeof document === 'undefined') {
            src = location.href;
        } else {
            src = document.currentScript.src;
        }
        input = src.replace(/\.js$/, '_bg.wasm');
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

wasm_bindgen = Object.assign(init, __exports);

})();

module.exports = wasm_bindgen