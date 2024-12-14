import "./styles.css";

/**
 * Header Props
 */
type HeaderProps = {
  title: string;
  subTitle: string;
};

/**
 * Top header component
 *
 * @param {HeaderProps} headerProps
 *
 * @returns {JSX.Element} component
 */
const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <div className="jumbotron jumbotron-fluid header">
      <div className="container">
        <h1 className="title">{title}</h1>
        <h3 className="sub-title">{subTitle}</h3>
      </div>
    </div>
  );
};

export default Header;
