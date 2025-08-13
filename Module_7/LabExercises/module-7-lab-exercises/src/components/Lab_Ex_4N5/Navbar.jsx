import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = ({ links }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lab Exercises
        </Typography>
        {links.map((link) => (
          <Button key={link.to} component={Link} to={link.to} variant="contained" color="success" sx={{ ml: 2 }}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
