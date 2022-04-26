import express, {Application as ExpressApp, Handler, NextFunction, Request, Response} from 'express';
import { controllers } from './index';
import { MetadataKeys } from './utils/metadata.keys';
import { IRouter } from './utils/handlers.decorator';
import cookieParser from "cookie-parser";
import cors from 'cors';
import history from 'connect-history-api-fallback';

class Application {
    private readonly _instance: ExpressApp;

    constructor() {
        this._instance = express();
        this._instance.use(history());
        this._instance.use(cookieParser());
        this._instance.use(cors({ credentials: true}));
        this._instance.use(express.json());
        this._instance.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });

        this.registerRouters();
    }

    private registerRouters() {
        this._instance.get('/', (req, res) => {
            res.json({ message: 'OK' });
        });

        const info: Array<{ api: string, handler: string }> = [];

        controllers.forEach((controllerClass) => {
            const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;

            const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
            const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

            const exRouter = express.Router();

            routers.forEach(({ method, path, handlerName}) => {
                exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));

                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handlerName)}`,
                });
            });

            this._instance.use(basePath, exRouter);
        });

        console.table(info);
    }

    get instance(): ExpressApp {
        return this._instance;
    }
}

export default new Application();