# PhoneShop Api Subject

A phone company wants to provide a back-end to list products and create orders from these elements.

Your objective as a developer will be to implement a module offering the following REST APIs

- An API to retrieve the list of products (which you can insert manually in the DB or at the start of the module)
- An API to retrieve a specific product
- An API to display the list of orders
- An API to place a product order


# Run Project

the project is delivered with a Dockerfile, use it to launch the server:

**Step 1:**
> docker build -t api .

**Step 2:**
> docker run -p 8080:8080 -d api

Once it is up please refer to the <a href="#Documentation">Documentation</a>
 section


## Documentation

The server provides a route to the **API** documentation, to be able to consult it please click on the following link:
> http://localhost:8080/docs/

## API Consumption

To use the API more simply, a **Postman collection** is provided in the folder:
>PostmanCollection/API_PhoneShop.postman_collection.json

Just import it into postman.

## Stack I used

- NodeJs/ExpressJs
- MongoDB
- Docker