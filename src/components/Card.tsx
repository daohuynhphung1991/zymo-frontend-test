import * as React from "react";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Card as CardMui, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

/**
 * This is a Card component.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    const classes = useStyles(props);
    return (
      <CardMui {...props} className={classes.cardWrapper}>
        <CardContent>{children}</CardContent>
      </CardMui>
    );
  }
);

const useStyles = makeStyles({
  cardWrapper: {
    margin: 20,
    width: 480,
  },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default Card;
