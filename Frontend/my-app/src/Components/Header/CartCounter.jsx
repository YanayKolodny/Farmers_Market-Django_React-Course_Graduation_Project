import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";

import { selectStandCartProds } from '../../Slices/standCartSlice'

// This component is the cart button in the header.
// It is arranged here to show the icon of the cart and the number of products.
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "rgb(116,108,92)"
  },
}));

export default function CustomizedBadges() {
  const standCartProds = useSelector(selectStandCartProds)
  const cartProdsAmount = standCartProds.length
  return (
    <Tooltip title="Shopping Cart">
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={cartProdsAmount} color="primary">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 33 }} color="rgb(116,108,92)" />
        </StyledBadge>
      </IconButton>
    </Tooltip>
  );
}
