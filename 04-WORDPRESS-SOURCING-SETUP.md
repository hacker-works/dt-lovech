# Wordpress Sourcing Setup

## Prepare Wordpress for Headless CMS

To be able to install the required Wordpress plugins, the `docker-compose.yaml` 
had to be updated to use the latest PHP and Wordpress.

Then, manually install the following Wordpress plugins:

* WPGraphQL
* WPGatsby
* ACF
* WPGraphQL for Advanced Custom Fields

## Gatsby Additional Setup

On the Gatsby end:
```bash
cd site
npm install gatsby-source-wordpress-experimental
```

Add the following configuration to `site/gatsby-config.js`:
```javascript
  plugins: [
    ...,
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url:
          //allows a fallback url if WPGRAPHQL_URL is not set in the env,
          //this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `http://localhost:8080/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become
          //"WpPost and allWpPost".
          typePrefix: `Wp`,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows 
          //them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Pull 50 posts in development to make it faster
                  50
                : // and we don't actually need more than 5000 in production
                  5000,
          },
        },
      },
  ],
```
