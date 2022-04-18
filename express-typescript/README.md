I - Setup
  1. npm i express.    
    - A web framework for node

  2. npm i mongoose      
    - A Object Document Mapper - ODM for MongoDB

  3. npm i cors      
    - CORS is a node.js package for providing a Connect/Express middleware

  4. npm i dotenv         
    - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env

  5. npm i morgan         
    - HTTP request logger middleware for node.js

  6. npm i -D typescript       
    - TypeScript is JavaScript with syntax for types

  7. npm i -D ts-node-dev       
    - It restarts target node process when any of required files changes

  8. Create a "tsconfig.json" file and copy:     
  
    {
      "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "rootDir": "src"
      },
      "lib": ["es2015"]
    }

  9. Updating the package.json File

II - How to use?
  1. Routes  

    > GET    /api/v1/products
    > GET    /api/v1/products/:id
    > POST   /api/v1/products
    > PUT    /api/v1/products/:id
    > DELETE /api/v1/products/:id

  2. Filter        
    gt = greater than, gte = greater than or equal.       
    lt = lesser than, lte = lesser than or equal.    
    
    > GET /api/v1/products?price=15
    > GET /api/v1/products?price[gt]=15.99
    > GET /api/v1/products?price[gte]=15.99
    > GET /api/v1/products?price[lt]=15.99
    > GET /api/v1/products?price[lte]=15.99
    > GET /api/v1/products?title[regex]=men&price[lte]=15.99

  3. Paginate               
    Default page=1 and limit=5    
    
    > GET /api/v1/products?page=2
    > GET /api/v1/products?page=2&limit=7

  4. Sort       
    Default sort='-createdAt'         
    
    > GET /api/v1/products?sort=price
    > GET /api/v1/products?sort=createdAt

  5. Full-text search    
  
    > GET /api/v1/products?search=men