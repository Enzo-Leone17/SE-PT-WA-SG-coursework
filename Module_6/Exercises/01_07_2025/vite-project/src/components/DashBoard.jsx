import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


export default function DashBoard({ dashboardData }) {
  let [currentCategory, setCategory] = React.useState(
    `${Object.keys(dashboardData)[0]}`
  );
  const handleChangeCategory = (event, newCategory) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Avatar alt="Profile picture" src="https://placeholder.com/150" />
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex" }}>
          <ToggleButtonGroup
            value={currentCategory}
            color="none"
            exclusive
            onChange={handleChangeCategory}
            aria-label="category toggle button group"
          >
            <List>
              {Object.keys(dashboardData).map((data) => (
                <ListItem key={data} disablePadding>
                  <ToggleButton value={data} aria-label="category" sx={{color: "white", }}>
                    <ListItemText primary={data} />
                  </ToggleButton>
                </ListItem>
              ))}
            </List>
          </ToggleButtonGroup>
          <Box
            sx={{
              flexGrow: 1,
              border: "1px solid black",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <Typography>
              {console.log(dashboardData[currentCategory])}
              {Array.isArray(dashboardData[currentCategory])
                ? dashboardData[currentCategory].map((data) => (
                    <>
                      <ListItem key={data}>
                        <ListItemText primary={`"${data}"`} />
                      </ListItem>
                      <Divider />
                    </>
                  ))
                : Object.entries(dashboardData[currentCategory]).map(
                    ([key, data]) => (
                      <>
                        <ListItem key={key}>
                          <ListItemText primary={key + ":"} secondary={data} />
                        </ListItem>
                        <Divider />
                      </>
                    )
                  )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
