import read from "./read";
import schema from "./schema";
import update from "./update";
import destroy from "./delete";
export default {
    ...schema,
    ...read,
    ...update,
    ...destroy
};
