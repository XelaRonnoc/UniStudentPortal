# COMP2110 Portal A group Project Names next to features Implemented by group memebers

## Installation

The project has no external dependencies, it uses Lit via a CDN load directly into
the HTML page. Node is used only to run a local HTTP server.

```bash
npm install
```

Will install the `http-server` node module.

```bash
npm start
```

will run the server.

## Backend Server

Your portal will make use of a server that we have implemented that is running on <https://comp2110-portal-server.fly.dev/>. Documentation for the services it provides
is in [this Github repository](https://github.com/COMP2110-2023/comp2110-portal-server/).

## Code

The code contains implementations of the following components:

### `<widget-carousel>` - Sam

This componant places all of the widgets, including `<ad-widget>`, in a carousel. Replaceing what was `<widget-column>`, the containener utilises the `overflow-x: scroll` property to scroll through each widget via the arrow buttons. All widgets maintain full functionality.

### `<comp2110-portal>`

This is a container for the whole portal application.

### `<widget-column>`

This component implements a container for widgets and can be used to define
the style information and layout for the group. This now holds the login, blog form and blog post widgets

### `<login-widget>` Alex (XelaRonnoc)

This component implements a login form that will allow a user to authenticate to the
backend server. If the user is logged in, the component displays their name and
a logout button rather than the form.

Authentication is implemented in the `auth.js` module. Once a user login succeeds,
the current user details are stored in the browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) so that
they persist over browser sessions. In your code, you can use the function
`getUser()` from the `auth.js` module to find out if a user is logged in and get
their details.

Upon successful verification the user then has access to the create blog post form. On a failed login the widget provides feedback that an incorrect username or password has been entered and does not allow access.

### `<blog-block>` + `<blog-form>` Alex (XelaRonnoc)

This component implements a blog using the backend API from the COMP2110 portal server.
A blog form has been added that allows for users who are logged in to write and post a blog post. Once a blog has been posted and sent to the API a get request is sent again to update the blog data the site instance has allowing for the live update of the website upon blog posting.

Additionally the blog block should refresh and re-fetch data every 60 seconds (after last successful refresh).

Additionally users can now use the page navigation buttons (next and previous) in the blog block to see earlier or later blog posts navigating through pages of 10.

The blog block now should also auto wrap long titles and paragraphs as well as handle empty headings and paragraphs. The block has size contraints to ensure asthetics
and usability are kept prominent through the use of media queries to handle different screen/window sizes

### `<ad-widget>` Pre-Built

This component displays an advertisement from the backend portal server. You should not
modify it and it should appear somewhere in your page design.

## Implemented Widgets

### `<currency-converter>` - Alex (XelaRonnoc)

Implemented a currency conversion widget utilising the exchangerate.host API (<https://exchangerate.host/>). The widget allows users to select from a range of currencies to convert to and from and select the amount to convert. The widget will provide feedback on loading and if invalid inputs are entered.

### `<dog-images>` - Craig

Created a widget to implement a dog api at (<https://dog.ceo/api/breeds/image/random?_=>) which grabs a random dog image from a collection of images, and includes the specific breed of the dog in the current image by splitting the url name and adding the value under the image

### `<joke-bot>` - Sam

Created a widget that implements jokeAPI from (<https://sv443.net/jokeapi/v2/>).
The widget generates a joke from the api and will refresh when the end-user clicks the 'give me a new joke' button.
Moreover, when the end-user clicks the button, a laugh track will play from the website, Zapsplat.com

### `<weather-forecast>` - Charlie

Created a widget that implements the current temperature and weather in Macquarie Park from (<https://api.open-meteo.com/v1/forecast>). Using the "is day" variable from the API the background of the widget will change to dark blue if it is nighttime or light blue if it is daytime. The API also provides a weather code, for example "0" = "clear weather", which is displayed along with a corresponding image to represent that weather.

## Styling Information 

The team went for a simplistic and seamless theme, incorporting a blue asthetic that is modernised and uses the same text and styling throughout the webpage.
