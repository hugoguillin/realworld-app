import { useAuth } from "../../context/AuthContext";
import { useFeedContext } from "../../context/FeedContext";
import FeedNavLink from "./FeedNavLink";

function FeedToggler() {
  const { isAuth } = useAuth();
  const { tabName, tagName } = useFeedContext();

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {isAuth && <FeedNavLink testid="your-feed" name="feed" text="Your Feed" />}

        <FeedNavLink testid="global-feed" name="global" text="Global Feed" />

        {tabName === "tag" && <FeedNavLink icon name="tag" text={tagName} />}
      </ul>
    </div>
  );
}

export default FeedToggler;
