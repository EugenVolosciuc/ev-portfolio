import { GraphQLClient } from 'graphql-request'

const graphcms = new GraphQLClient(
  process.env.GRAPHCMS_API, 
  { 
    headers: { 
      authorization: `Bearer ${process.env.GRAPHCMS_API_APP_TOKEN}`
    } 
  }
)

export default graphcms