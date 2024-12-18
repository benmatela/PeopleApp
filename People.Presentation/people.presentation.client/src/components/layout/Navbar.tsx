import { Home, People, PeopleOutlined } from "@mui/icons-material";
import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { IMenuListItem } from "../../models/menu.model";
import { isCurrentPath } from "../../utils/strings.utils";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  // Page navigation
  const navigate = useNavigate();
  // Menu to be shown on the navbar
  const menuItems: IMenuListItem[] = [
    {
      id: 0,
      text: "Home",
      isSelected: isCurrentPath("/home"),
      icon: Home,
      linkTo: "/home",
      roles: [],
      subMenu: [],
    },
    {
      id: 1,
      text: "People",
      isSelected: isCurrentPath("/people"),
      icon: People,
      linkTo: "/people",
      roles: [],
      subMenu: [],
    },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#1976d2", borderRadius: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo or Title */}
        <PeopleOutlined sx={{ fontSize: 60, pt: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, mt: 1, ml: 2, fontWeight: "bold" }}
        >
          People Management
        </Typography>

        {/* Menu items */}
        <List sx={{ display: "flex", fontWeight: "bold" }}>
          {menuItems.map((menu: IMenuListItem) => (
            <ListItem
              key={menu.id}
              data-testid={"menuListItem"}
              onClick={() => navigate(menu.linkTo)}
              sx={{cursor: "pointer"}}
            >
              <ListItemText primary={menu.text} />
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};
