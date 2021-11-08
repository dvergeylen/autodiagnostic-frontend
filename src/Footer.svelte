<footer>
  <div>
    <img id="logo-fse" src="/assets/images/logo_FSE_Coq_Wallonie.svg" alt="Logo FSE et Wallonie"/>
  </div>
  <div id="footer-container">
    <div>
      <p id="moto" class="is-uppercase">'Voyage au bout du monde' est un outil développé le groupe <a href="https://www.sowalfin.be">Sowalfin</a>.</p>
    </div>
    <div>
      <img id="sowalfin-creation" src="/assets/images/logo_sowalfin_creation.svg" alt="Sowalfin Création"/>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    max-width: 50em;
    min-width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;
  }
  #logo-fse {
    max-width: 12em;
    margin: auto;
    margin-left: 5%;
  }
  #footer-container {
    display:flex;
    justify-content: center;
    align-items: center;
    margin: auto;

    div {
      text-align: center;
    }

    // Tablets, Desktops
    @media (min-width: 768px) {
      display: flex;

      div {
        margin-left: 1em;
        margin-right: 1em;
      }
    }
  }
  footer::after {
    content: "";
    height: 2em;
    background: url("/assets/images/trame_sowalfin.svg");
    background-repeat: repeat-x;
    display: inline-block;
    width: 100%;
  }

  #moto {
    font-size: 0.75em;
  }
  #sowalfin-creation {
    max-width: 5em;
    margin:auto;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
</style>