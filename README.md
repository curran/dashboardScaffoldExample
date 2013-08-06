An example project that uses the dashboardScaffold library.

![An example dashboard](http://farm6.staticflickr.com/5532/9449466691_6c55d58033_z.jpg "Example Dashboard")

[Try it out!](http://curran.github.io/dashboardScaffold/example/index.html)

When you click on a color or number in the configurator on the left, an interactive editor (color chooser or slider) pops up. When you manipulate the configuration, it is propagated through the dashboard layout to the component visualizations instantly. When you edit properties of the visualizations through their own UI interactions, the configuration JSON is instantly updated.

A development server is included. To start the server:

 * Make sure you have Node.js and Express installed
   * `npm install express`
 * Run `node server.js`

There are two pages:

 * `index.html` shows the dashboard with an editor panel
 * `dashboard.html` shows the dashboard full-screen with no editor

There are two example visualization modules:

 * `vis` A simple colored rectangle with an X and some text on it.
   * Clicking the background changes its color randomly. Notice how this causes the configuration JSON to update.
   * Clicking the X causes its color to update randomly.
   * Dragging the X changes its thickness.
 * `map` An example that renders a [Leaflet](http://leafletjs.com/) map.
   * Changing the "tileProvider" option dynamically changes the tiles shown on the map (see [Leaflet-Providers](https://github.com/leaflet-extras/leaflet-providers)).

Enjoy!

I'd love to hear your feedback at curran.kelleher@gmail.com

Curran Kelleher 8/6/2013
