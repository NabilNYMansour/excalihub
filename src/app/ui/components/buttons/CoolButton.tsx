import { CSSProperties } from "react";
import classes from "./CoolButton.module.css";
import cx from "clsx";

const CoolButton = ({ href, children, style, target }: { href: string, children?: React.ReactNode, style?: CSSProperties, target?: string }) => {
  return (
    <div>
      <a style={style} href={href} target={target}
        className={cx(classes.butn, classes.butn__new)}>
        <span>{children}</span>
      </a>
    </div>
  );
};

export default CoolButton;