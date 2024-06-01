import React, { useContext } from "react";
import styles from "./Button.module.scss";
import Image from "next/image";

interface IButtonProps {
  text?: string;
  title?: string;
  imgSrc?: string;
  imgAltText?: string;
  imgPos?: string;
  imgStyles?: {
    styles?: any;
    size: {
      height: string;
      width: string;
    };
  };
  btnStyles?: any;
  hoverStyles?: any;
  dataTestID?: string;
  onBtnClick(): any; // function can return anything (variables, objects, arrays, etc.)
  activeOpt?: boolean;
  icon?: any;
  type?: string; // this will tell which type of button it is- primary,secondary, tertiary or icon
  textStyle?: any;
}

function Button({
  text,
  title,
  imgSrc,
  imgAltText,
  imgPos,
  imgStyles,
  btnStyles,
  hoverStyles, // do add !important in case you want to override the inlineStyles
  dataTestID,
  onBtnClick,
  activeOpt,
  icon,
  type,
  textStyle,
}: IButtonProps) {
  const buttonClickHandler = () => {
    onBtnClick();
  };


  const defaultBtnStyles = {
    height: "35px",
    border: "none",
    outline: "none",
  };

  const appliedStyles = { ...defaultBtnStyles, ...btnStyles };

  return (
    <button
      type="button"
      data-testid={dataTestID || "customBtnComponent"}
      className={imgSrc && imgPos === "right" ? styles["move-right"] : styles["button-element"]}
      style={appliedStyles}
      tabIndex={-1}
      onClick={buttonClickHandler}
      title={title}
    >
      {imgSrc ? (
        <div data-testid="imgElement" style={imgStyles && imgStyles.styles} className={styles["img-container"]}>
          {activeOpt && (
            <span
              className=""
            />
          )}
          <Image
            src={imgSrc}
            alt={imgAltText as string}
            height={imgStyles?.size?.height as unknown as number}
            width={imgStyles?.size?.width as unknown as number}
            layout="fixed"
            priority
          />
        </div>
      ) : (
        ""
      )}
      {icon && React.cloneElement(icon)}
      <span className="" style={textStyle}>
        {text || ""}
      </span>
    </button>
  );
}

Button.defaultProps = {
  text: "",
  title: "",
  imgSrc: "",
  imgAltText: "",
  imgPos: "",
  imgStyles: {
    styles: {},
    size: {
      height: 13,
      width: 13,
    },
  },
  btnStyles: "",
  hoverStyles: "",
  dataTestID: "",
  activeOpt: false,
  icon: null,
  type: "",
  textStyle: {},
};

export default Button;
