import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
const NavLinkComponent = ({ url, label, onClick }) => {
  return (
    <NavLink to={url} onClick={onClick}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 1,
          }}
          color={isActive ? "warning.text" : "text.primary"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
