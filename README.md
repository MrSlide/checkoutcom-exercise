# Checkout.com coding exercise

## Brief summary

Create an application capable of collecting user feedback and then show details of feedback collected so far.

## Requirements

* Node.js v19
* NPM v9

## How to get set up

Follow the following steps to get ready to run the application:

1. Open your terminal
2. Change the current working directory to the project root
3. Install the project dependencies using `npm install`

## Running the project

It's possible to run the project in either development mode or in build mode.

### Development mode

In development whenever there are changes to the code the content of the page loaded in the browser will automatically update to reflect the changes.

Run the following command in your terminal:

```bash
npm run dev
```

### Build mode

In build mode the code is compiled and prepared for distribution, any changes to the code will require a new build.

Run the following commands in your terminal:

```bash
npm run build
npm start
```

## Running the unit tests

Run the following command in your terminal:

```bash
npm test
```

## Notes

* The API stores the data in a JSON file locally instead of using a database or other higher grade type of store. Initially the data was being stored in memory but due to how Next.js bundles modules there were some issues with the same value not being used for all endpoints.
* The wireframes were displaying the comment author's email address but that is not good for privacy so the author's name is being displayed instead.

## Possible improvements

These are some of the improvements that could be done to improve the project:

* Page component modules could be further broken down into smaller units, in particular the feedback form module could see the input value validation functions and data handling functions split out into other modules.
* Add support for localisation, including the use of translations instead of hard-coded text and formatting of data using the `INTL` API.
* More properties could be handled via theming, there are a few components which were created towards the end which make use of hard-coded styles.
* By using a `ThemeProvider` component it would be possible to easily swap the theme as necessary at runtime.
* By using something like PostCSS it would be possible to re-use CSS more easily and make other transformations to improve the developer experience and reduce bundle sizes.
* The accessibility of input error messages could be further improved by assigning an `id` to them and making use of the `aria-describedby` attribute on the input element.
* The stability of the form data could be improved by making the inputs read-only when the form is either validating or submitting.
* Although the pages and data load very quickly, a loading component could be used to indicate that content is loading.
* The `RatingsChart` component could be updated so that any data updates are done by updating the existing instance of the chart instead of destroying the existing instance and creating a new one.
* Some components would benefit for more configuration options to fit different use cases.
* The two column layout for the form is an awkward one to have as the components change the height of their bounding box throughout their lifecycle, causing the layout to look messy. Discussions with the designer would be necessary to come to a compromise.
* The `SubmitButton` component could benefit from a visual indication of the busy state other than just disabling the button.
* Not all states for interactive elements such as form inputs and buttons were created.
* The rating value selection would have been better done as a `select` dropdown, but that would have taken longer to execute.
* More and better animations and transitions could be added to improve the user experience.
* Add CSP rules including the use of a nonce to improve the application security.
* Write more extensive unit tests to improve test coverage and trust in the code.
* For the TypeScript and ESLint configurations the Next.js defaults were used, but these are quite permissive and could benefit from being stricter to enforce better practices and full code typing to reduce the chance for errors
* There is some duplication of utility code used in unit tests which could be moved into dedicated modules that can be re-used.
* I tried to use `@testing-library/react` for the first time in a while to test the form interactions and data submission but ran into issues with some updates not being wrapped in `act()` calls (even though the library is supposed to have those calls built-in), this was likely due to the async form submission and could likely be fixed by splitting the code into smaller units as described above and mocking the different steps.
* Lots more tests could be added and existing ones could have been improved.
* A lot of functions are still missing DocTags.
