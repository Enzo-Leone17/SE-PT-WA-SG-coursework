import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function TeamMemberCard({ teamMember }) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="profile picture"
        //height="140"
        image={teamMember?.avatar}
      />
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {teamMember?.name ? teamMember.name : "Default Name"}
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {teamMember?.title ? teamMember.title : "Default Title"}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small">Follow</Button>
        <Button size="small">Message</Button>
      </CardActions>
    </Card>
  );
}
