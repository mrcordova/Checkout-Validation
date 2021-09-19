
## Goals
1. It builds successfully after checkout and `npm install` is run in the root directory.
2. It should be responsive, the starting code looks good on mobile and desktop. Don't break that!
3. It properly validates the form input to ensure that the required entry is there before calling the API. Input
   validation messages are clearly understandable to the user.
4. It handles successful address validations by updating the contents of the form.
5. It handles unsuccessful address validations by alerting the user in a friendly way.
6. It handles timeouts and other network-related issues encountered while making requests to the API.
7. It handles slow requests, in a way that's obvious to the user that it's still loading.

Making a request for the following address (or any with a 48429 postal code) will take at least 5 seconds to respond.
This can help demonstrate your loading indicator:

```
Eric Wright
Josh's Frogs
8751 Monroe Rd.
Durand, MI 48429
```

## What's in the box?

This project is based on Angular 12.2. It was generated using the Angular CLI, with the Router enabled and SCSS chosen
as the styling language. TailwindCSS (including the Typography and Forms plugins) was installed and enabled.

The use of [TailwindCSS](https://tailwindcss.com/docs) is encouraged, but not required, to complete this project. It is
a utility-first CSS framework. In contrast to other projects like Bootstrap or Material Design, TailwindCSS does not
provide any pre-made components. Instead, it provides a large number of utility classes which can be combined to create
really beautiful designs without sacrificing the developer's ability to customize. It's not a one-size-fits-all
approach, but it still avoids the tedium of writing CSS from scratch. If you are new to TailwindCSS, I highly recommend
reading their Core Concepts pages within the documentation.

## Calling the API

Swagger documentation for the API is available at https://interview.joshsfrogs.com/swagger/index.html.

The Swagger documentation describes the address validation endpoint (https://interview.joshsfrogs.com/validate) and the
format of the request/responses.

From the Swagger page, you can click the "Try it out" button, and submit example requests from there.

You might find tools like [Insomnia](https://insomnia.rest/) or Postman to be helpful in working with the API.

Please keep in mind that Angular will enforce CORS policies. You will need to create a proxy as described here if you
encounter trouble when calling the API from your Angular code:
https://levelup.gitconnected.com/fixing-cors-errors-with-angular-cli-proxy-e5e0ef143f85

Your implementation with the API only needs to support US addresses. Please feel welcome to hardcode the `country` field
as "US" and pass null for the `residential` field.

Using `curl` to call the API:

```
curl -X 'POST' \
  'https://interview.joshsfrogs.com/validate' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "Eric",
  "lastName": "Wright",
  "company": "Josh'\''s Frogs",
  "line1": "222 S. Elm",
  "line2": null,
  "city": "Owosso",
  "state": "MI",
  "postalCode": "48867",
  "country": "US",
  "residential": false
}'
```
