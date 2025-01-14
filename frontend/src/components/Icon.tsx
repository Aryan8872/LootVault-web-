import * as React from "react";
import { IconProps } from "../constants/types";

export const Icon: React.FC<IconProps> = ({ src, alt, className }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}

    className={`object-cover shrink-0 self-stretch my-auto ${className}`}
  />
);