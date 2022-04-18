export function APIfeatures(query, queryString) {
    //const this = {}
    this.query = query; //Product.find()
    this.queryString = queryString; //req.query
    this.panigating = () => {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = limit * (page - 1);
        this.query = this.query.limit(limit).skip(skip);
        return this;
    },
    this.sorting = () => {
        const sort = this.queryString.sort || '-createdAt';
        this.query = this.query.sort(sort);
        return this;
    },
    this.searching = () => {
        const search = this.queryString.search;
        if (search) {
            this.query = this.query.find({
                $text: {$search: search},
            })
        }
        else {
            this.query = this.query.find();
        }
        return this;
    }
    this.filtering = () => {
        const queryObject = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'search'];
        excludedFields.forEach(item => delete (queryObject[item]));
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }
}