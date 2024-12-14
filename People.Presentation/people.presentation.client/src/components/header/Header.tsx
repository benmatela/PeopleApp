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
        <h1>{title}</h1>
        <p className="lead">{subTitle}</p>
      </div>
    </div>
  );
};

export default Header;
