declare function Advisor(type: any, advised: any, advisedFunc?: any): void;
declare class Advisor {
    constructor(type: any, advised: any, advisedFunc?: any);
    type: any;
    advised: any;
    advisedMethod: any;
    /**
     * Applies advice
     *
     * @param adviser
     * @param method
     * @param transfer
     * @returns {*}
     */
    add(adviser: any, method?: any, transfer?: boolean): any;
}
export function before(advised: any, advisedFunc?: any): Advisor;
export function after(advised: any, advisedFunc: any): Advisor;
export function around(advised: any, advisedFunc: any): Advisor;
export {};
