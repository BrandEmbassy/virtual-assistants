import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

export default function ChatScript({ data }) {
  let record = data.airtable
  const script = record.data.script
  return (
    <Container maxWidth='sm'>
      <Helmet>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap'
          rel='stylesheet'
        />
        <script src='../utils/chat.js' />
        <script>{script}</script>
      </Helmet>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          {`Loading ${record.data.name}...`}
        </Typography>
      </Box>
    </Container>
  )
}

export const query = graphql`
  query ChatScriptBySlug($name: String!) {
    airtable(table: { eq: "bots" }, data: { name: { eq: $name } }) {
      id
      data {
        name
        desc
        script
      }
    }
  }
`
