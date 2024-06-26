/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services">Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe">Notre équipe</a>
      </li>
    </ul>
    <Button
      title="contact"
      onClick={() => {
        const currentHash = window.document.location.hash;
        if (currentHash === "#contact") {
          window.document.location.hash = "";
        }
        window.document.location.hash = "#contact";
      }}
    >
      Contact
    </Button>
  </nav>
);

export default Menu;