//import team member card
import Grid from "@mui/material/Grid";
import TeamMemberCard from "../components/common/TeamMemberCard.jsx";


const TeamList = ({team}) => {
  return (
    <>
      <Grid container spacing={2}>
        {team.map((teamMember) => (
          <Grid item xs={12} sm={6} md={4} key={teamMember.name}>
            <TeamMemberCard teamMember={teamMember} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TeamList;