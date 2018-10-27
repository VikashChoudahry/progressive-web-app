# progressive-web-app
Progressive Web App using service-worker

# Description
This app is created for learning purpose with live example to know how
progressive web application basically works.

In this app, I have used `newsapi.org` API key to consume their API.

# Pre-requisite(s)
1. Create an account in newsapi.org. *Note: * In-case you want to use your own generated API key.
2. Generate the key.
3. Use the generated key. *Note: * You need to update this key in app.js file.

# Step(s) to run the application
1. Install the required modules using: `npm install`
2. Run http server from your project folder: `http-server`
3. Access the application with: http://127.0.0.1:8080 *Note: * This default port. It may change.

# Step(s) to test the app (Manual)
1. Once app runs successfully, access it through browser.
2. Releoad the page.
3. Change the default news source (in this case `Google News (India)`) to other.
4. Turn of the internet and relead the page.

*Expected output*: You will be able to see the visited news page content(s) even though there is no internet connection.

*Note*:
1. fallback.json: Custom response object when you try to access the application without internet.

# Reference:
1. Youtube link: https://www.youtube.com/watch?v=gcx-3qi7t7c&t=2122s
2. https://medium.freecodecamp.org/progressive-web-apps-101-the-what-why-and-how-4aa5e9065ac2
