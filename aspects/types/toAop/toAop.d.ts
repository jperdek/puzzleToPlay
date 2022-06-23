export const __esModule: boolean;
export function aop(target: any, pattern: any, settings?: {
    constructor: boolean;
}): any;
export function createAspect(pattern: any): (target: any) => any;
export function createCallTrap({ target, object, property, pattern, context, method, }: {
    target: any;
    object: any;
    property: any;
    pattern: any;
    context: any;
    method: any;
}): (...rest: any[]) => any;
export function createGetTrap({ target, object, property, pattern, context, method, }: {
    target: any;
    object: any;
    property: any;
    pattern: any;
    context: any;
    method: any;
}): () => any;
export function createHook(name: any, regular: any, callback: any): {
    [x: number]: (meta: any) => any;
};
export function createProxy(target: any, pattern: any, context: any): any;
export function createSetTrap({ target, object, property, pattern, context, }: {
    target: any;
    object: any;
    property: any;
    pattern: any;
    context: any;
}): (payload: any) => any;
export function hookFor(meta: any, regular: any, callback: any): any;
export const hookName: Readonly<{
    beforeMethod: "beforeMethod";
    afterMethod: "afterMethod";
    aroundMethod: "aroundMethod";
    beforeGetter: "beforeGetter";
    afterGetter: "afterGetter";
    aroundGetter: "aroundGetter";
    beforeSetter: "beforeSetter";
    afterSetter: "afterSetter";
    aroundSetter: "aroundSetter";
}>;
export function unAop(target: any): void;
