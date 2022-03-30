import { MetadataKeys } from "./metadata.keys";

export enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
    TRACE = 'trace',
    HEAD = 'head',
    CONNECT = 'connect'
}

export interface IRouter {
    method: Method;
    path: string;
    handlerName: string | symbol;
}

const methodDecoratorFactory = (method: Method) => {
    return (path: string): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                : [];

            routers.push({ method, path, handlerName: propertyKey });

            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
        }
    }
}

export const Get = methodDecoratorFactory(Method.GET);
export const Post = methodDecoratorFactory(Method.POST);
export const Patch = methodDecoratorFactory(Method.PATCH);
export const Put = methodDecoratorFactory(Method.PUT);
export const Delete = methodDecoratorFactory(Method.DELETE);
export const Trace = methodDecoratorFactory(Method.TRACE);
export const Head = methodDecoratorFactory(Method.HEAD);
export const Connect = methodDecoratorFactory(Method.CONNECT);