import { CSSProperties } from "react";
import classes from "./CoolButton.module.css";
import cx from "clsx";

const CoolButton = ({ href, text, style }: { href: string, text: string, style?: CSSProperties }) => {
  return (
    <div>
      <a style={style} href={href} className={cx(classes.butn, classes.butn__new)}>
        <span>{text}</span>
      </a>
    </div>
  );
};

export default CoolButton;