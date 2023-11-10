import Header from "./Header/header.js";
import Footer from "./Footer/footer.js";

function HeaderOnly({ children }) {
  console.log(children);
  return (
    <div>
      <Header></Header>
      <div className="container">
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HeaderOnly;
