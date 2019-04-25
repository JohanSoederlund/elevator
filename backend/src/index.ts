import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as cors from "kcors";

import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/sample", (context) => {
    Object.assign(context.response, {
        body: {message: "Hello world"},
        status: 200,
    }); 
});

app.use(router.routes());
app.use(bodyparser({
    enableTypes: ["json"]
}))
app.use(cors());

app.listen(3000);

