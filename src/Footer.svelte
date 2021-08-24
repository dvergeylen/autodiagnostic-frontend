<footer>
  <div id="footer-container">
    <div>
      <img id="sowalfin-creation" src="/assets/images/logo_sowalfin_creation.svg" alt="Sowalfin Création"/>
    </div>
    <div>
      <p class="is-uppercase">'Voyage au bout du monde' est un outil développé <a href="https://www.sowalfin.be">Sowalfin group</a>.</p>
    </div>
  </div>
</footer>

<style lang="scss">
  #footer-container {
    justify-content: center;
    align-items: center;
    margin-bottom: 3em;
    margin-top: 2em;

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

  #sowalfin-creation {
    max-width: 10em;
    margin:auto;
  }

  .is-uppercase {
    text-transform: uppercase;
  }
</style>