React, Spring Boot and Keycloak
=

This is an example of how a React application requesting data from a Spring Boot application secured with Keycloak.

Setup
-

Checkout the code and run

```
mvn -f api/pom.xml clean install spring-boot:repackage
```

Run
-

First, start Keycloak, e.g. via

```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```

Open `http://localhost:8080`, create a Realm called `spring-boot`, with a client called `spring-boot`, a wildcard `*`
redirect and a user with arbitrary credentials (for the values see `./api/src/main/resources/application.yml`).

Then, start Spring Boot, e.g. via

```
java -jar ./api/target/api.jar
```

Finally, run the UI, e.g. via

```
(cd ui && npm start)
```

and wait for it to open on `localhost:3000`.

Note that when the UI tries to request data from the API it causes the redirect to Keycloak as Spring Boot realises that
the Keycloak Cookie is missing. After logging in, the data can be retrieved as usual. As the Cookie has been stored for
the URL of the Spring Boot application (see `./api/src/main/resources/static/index/html`), the React application supports
hot reloading without the need to authenticate again and due to Spring Boot taking care of the exchange of code against
token, the UI is unaware of any token at all.