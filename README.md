ASSERTION
---------

Create and share javascript unit tests via the web. 

Building
--------

Compiling the source code is as easy as:

- clone repo
- `npm install`
- `npm run dev`

`npm run dev` will compile the server into the build folder, browserify the client side js and copy any static files into the build folder, and finally start the server on port 9966.

To interact with the database, use the cli program `assertion-db`. It gives the commands `start`, `stop`, and `status` for interacting with a background process database used by the server.

If desired, running `npm link` will copy the `assertion-db` binary into your global folder for ease of execution.

Scripts
-------

There are a few other package scripts that might be useful while developing:

- `watch-main`
  - watchify main.js for the landing page javascript
- `watch-editor`
  - watchify editor.js for the editor page
- `watch-result`
  - watchify result.js for the logic running in the sandboxed iframe
- `statics`
  - copy over anything in the src/ui/statics folder into the build folder under the path build/ui/*
- `start`
  - start the server with DEBUG=server,api,static,error debug loggin options set
- `clean`
  - remove the build folder
- `test`
  - run unit tests

I think there are enough scripts to where it would be prudent to use a task manager, but that's for a later date.

Tests
-----

There are unit tests for all endpoints the server exposes located in `src/tests/api` with the filenames `api.*.spec.js`.

Running `npm test` will transform (through babel) any file with *.spec.js and output to `rootDir/tests/**/*.spec.js` and then mocha will be run against that output directory.

License
-------

MIT