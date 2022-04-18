import logEvents from "../helpers/logEvents";
export const checkProductData = async (req, res, next) => {
    //req.body = object
    const errors = [];
    for (const key in req.body) {
        if (!req.body[key]) {
            errors.push(`Please add product ${key}`);
        }
    }
    if (errors.length > 0) {
        errors.forEach(async item => await logEvents(`${item}\n`))
        return res.status(401).json({message: errors})
    }
    next();
}

