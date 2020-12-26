module.exports = {
  siteMetadata: {
    title: "Dramatic Theater Lovech",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
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
                ? // Pull 50 posts in dev to make it faster
                  50
                : // and we don't actually need more than 5000 in production
                  5000,
          },
        },
      },
  ],
};
