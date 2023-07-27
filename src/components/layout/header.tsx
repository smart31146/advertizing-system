import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => router.push("/")}
          >
            {/* 広告収集自動システム */}
          </Typography>
          {session ? (
            <>
              <IconButton
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Tooltip title="アカウント">
                  <AccountCircleIcon />
                </Tooltip>
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => router.push("/")}>
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Topページ</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => router.push("/chatgpt")}>
                  <ListItemIcon>
                    <SettingsSuggestIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>ChatGPT設定</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>ログアウト</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit" onClick={() => signIn()}>
              <Tooltip title="ログイン">
                <LoginIcon />
              </Tooltip>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
