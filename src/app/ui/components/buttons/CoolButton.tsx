import { CSSProperties } from "react";
import classes from "./CoolButton.module.css";
import cx from "clsx";

const CoolButton = ({ href, text, style, target }: { href: string, text: string, style?: CSSProperties, target?: string }) => {
  return (
    <div>
      <a style={style} href={href} target={target} className={cx(classes.butn, classes.butn__new)}>
        <span>{text}</span>
      </a>
    </div>
  );
};

export default CoolButton;