import { Skeleton } from "@mui/material";
import React from "react";
import PlaceHolderImageBook from "./PlaceHolderImageBook";

export default function Image({
  style,
  imagePath,
  alt = "Book Image",
  ...rest
}) {
  return imagePath ? (
    <div style={{ position:"relative",width: "100%", height: "100%" }}>
      <img
        style={{ zIndex:2,objectFit: "cover", width: "100%", height: "100%", ...style }}
        src={`${imagePath}`}
        srcSet={`${imagePath}`}
        alt={alt}
        loading="lazy"
        {...rest}
      />
    </div>
  ) : (
    <Skeleton sx={{ height: "100%", width: "100%", flex: 1, flexGrow: 1 }} />
  );
}
