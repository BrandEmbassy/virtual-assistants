const path = require(`path`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug

  if (node.internal.type === `Airtable` && node.table === ` bots`) {
    slug = `/${node.data.Name.replace(/ /g, '-').replace(/[,&]/g, '').toLowerCase()}/`

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  return new Promise((resolve, reject) => {
    const pages = []
    const chatScript = path.resolve(`src/templates/chatScript.js`)

    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
          {
            allAirtable(filter: { table: { eq: "bots" } }) {
              edges {
                node {
                  data {
                    name
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          result.errors.forEach((error) => {
            console.log(error)
          })

          reject(result.errors)
        }
        console.log(result)
        result.data.allAirtable.edges.forEach((edge) => {
          createPage({
            path: edge.node.data.name, // required, we don't have frontmatter for this page hence separate if()
            component: chatScript,
            context: {
              name: edge.node.data.name,
            },
          })
        })

        return
      })
    )
  })
}
