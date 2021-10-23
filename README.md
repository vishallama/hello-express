# hello-express

## A Fly.io Example

This is a very simple example that shows how to _launch_ and _deploy_ a Node
application on the Fly.io platform. It demonstrates the **static asset caching**
feature offered by the platform. Developers enable this feature by adding a
`[statics]` section in the associated Fly configuration file (`fly.toml`) for
their application. We initially generate this configuration file using the
`flyctl` utility, after which we edit it by adding the `[statics]` section.

Since `fly` is synonymous with `flyct`, we will use the former on the command
line, in the instructions below.

## Getting the App Ready

Get the code for this example from the [hello-express Github repo](https://github.com/vishallama/hello-express). Or, to obtain a local copy, on the command line just
run `git clone git@github.com:vishallama/hello-express.git`.

Now, run `cd hello-express`, followed by `npm install` to install all the Node
dependencies locally. Then, run `node server.js`, and then enter
`localhost:3000` in your web browser address field to check if the app runs
as expected.

If everything looks okay, you may kill the running app (`Ctrl+C` on Linux) to
proceed with instructions on launching and deploying on the Fly platform, below.

## Launching the App

Follow the [Login to Fly Quickstart Guide](https://fly.io/docs/getting-started/login-to-fly/) to set up your Fly account, and after you've done so, come back
here.

Make sure you are in the root of the `hello-express` folder. Now, run
`fly launch`, which will detect a NodeJS app. The build configuration utilized
by the `fly` utility will be `heroku/buildpacks:20`. Let the utility choose a
randomly generated app name for your app. Select your region where your app
will eventually be deployed. When asked `Would you like to deploy now?`, answer
`No`. Once this process is finished, you should have a `fly.toml` file in the
root of the app folder. This is the configuration file used by the Fly platform
when we later deploy your app.

## Enable Static Asset Caching

Here's a snippet of the code contained in the app's `fly.toml` file that was
generated:

```toml
app = "hello-express"

kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"
```

Let's add a `statics` section in the above file.

```toml
[[statics]]
guest_path = "/public"
url_prefix = "/static"
```

Here, `statics` is an array of tables. And, the first element of that array is
an (unnamed) table contaning two key/value pairs. Upon deploying, the `/public`
folder is pulled out of the packaged app, and requests to `https://hello-express.fly.dev/static` are then served from caches on Fly's edge servers.
