import React, { useState, useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Link, graphql } from 'gatsby'

const drawerWidth = 300

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
)

const mdTheme = createTheme()

const Dashboard = ({ data }) => {
  const [open, setOpen] = React.useState(true)
  const [selectedBotName, setSelectedBotName] = React.useState(
    data.allAirtable.edges[0].node.data.name
  )
  const [selectedBot, setSelectedBot] = React.useState(data.allAirtable.edges[0].node.data)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleSelectedBot = (name, data) => {
    setSelectedBotName(name)
    setSelectedBot(data)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'flex-end' : 'center',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {data.allAirtable.edges.map((edge, i) => (
              <ListItem disablePadding alignItems='flex-start'>
                <ListItemButton
                  selected={edge.node.data.name === selectedBotName}
                  onClick={() => handleSelectedBot(edge.node.data.name, edge.node.data)}
                >
                  <ListItemAvatar>
                    <Avatar alt={edge.node.data.name} src='/static/images/avatar/2.jpg' />
                  </ListItemAvatar>

                  <ListItemText
                    primary={edge.node.data.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }}
                          component='div'
                          variant='body2'
                          color='text.primary'
                        >
                          {edge.node.data.channelId}
                        </Typography>
                      </React.Fragment>
                    }
                    sx={{
                      visiblity: open ? 'visible' : 'hidden',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth='100%'>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='h1'
                  sx={{
                    paddingTop: '20px',
                  }}
                >
                  Virtual Assistant Hub
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ maxWidth: '100%' }}>
                  <CardMedia
                    sx={{
                      border: 'none',
                    }}
                    component='iframe'
                    height='600px'
                    src={`/${selectedBotName}`}
                  />
                  <CardActions>
                    <Button size='small'>Share</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography gutterBottom variant='h5' component='div'>
                    {selectedBot.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {selectedBot.desc}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "bots" } }) {
      edges {
        node {
          data {
            name
            desc
            script
          }
        }
      }
    }
  }
`

export default Dashboard
