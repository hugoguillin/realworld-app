import avatar from "../../assets/smiley-cyrus.jpeg";

function Avatar({ testid, alt, className, src }) {
  return (
    <img
data-testid={testid}
      alt={alt || "placeholder"}
      className={className || ""}
      src={src || avatar}
    />
  );
}

export default Avatar;
