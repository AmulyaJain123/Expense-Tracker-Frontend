import errorIcon from "../assets/extras/error.png";
import error2 from "../assets/error2.png";
import error2red from "../assets/error2-red.png";

export function EmptyBox({
  IconSize = 40,
  textSize = 14,
  gap = 8,
  msg = "No Prod Found",
  textColor = "#000",
  fontWeight = 400,
}) {
  return (
    <>
      <div
        style={{
          rowGap: `${gap}px`,
          fontSize: `${IconSize}px`,
          color: textColor,
        }}
        className="flex flex-col text-sm flex-grow justify-center items-center"
      >
        <i className="fi fi-bs-drawer-empty flex justify-center items-center"></i>
        <span style={{ fontSize: textSize, fontWeight: fontWeight }}>
          {msg}
        </span>
      </div>
    </>
  );
}

export function ErrorBox({
  IconSize = 40,
  textSize = 14,
  gap = 8,
  msg = "Something Went Wrong",
  textColor = "#000",
  fontWeight = 400,
  children,
}) {
  return (
    <>
      <div
        style={{
          rowGap: `${gap}px`,
          fontSize: `${IconSize}px`,
          color: textColor,
        }}
        className="flex flex-col errorBack rounded-lg text-sm flex-grow justify-center items-center"
      >
        <img
          src={errorIcon}
          className=""
          style={{ width: `${IconSize}px` }}
          alt=""
        />
        <span
          style={{
            fontSize: `${textSize}px`,
            fontWeight: fontWeight,
          }}
        >
          {msg}
        </span>
        <div>{children}</div>
      </div>
    </>
  );
}

export function ErrorText({
  IconSize = 16,
  textSize = 14,
  gap = 4,
  msg = "Something Went Wrong",
  color = "red",
  fontWeight = 400,
}) {
  return (
    <>
      <div className="flex items-center">
        <img
          src={color === "red" ? error2red : error2}
          style={{
            marginRight: `${gap}px`,
            width: `${IconSize}px`,
            height: `${IconSize}px`,
          }}
          alt=""
        />
        <span
          style={{
            fontWeight: fontWeight,
            color: color,
            fontSize: `${textSize}px`,
          }}
        >
          {msg}
        </span>
      </div>
    </>
  );
}
