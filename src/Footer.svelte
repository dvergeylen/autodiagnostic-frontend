<footer>
  <div class="is-flex has-align-items-center">
    <div class="logo-container">
      <img id="sowalfin-creation" src="/assets/images/logo_sowalfin_creation.svg" alt="Sowalfin Création"/>
    </div>
    <div class="logo-container">
      <img src="/assets/images/logo_FSE_Coq_Wallonie.svg" alt="Logo FSE et Wallonie"/>
    </div>
    <div class="logo-container">
      <img src="/assets/images/logo_EnMieux.svg" alt="Logo En Mieux"/>
    </div>
  </div>
  <div id="footer-container">
    <p id="moto" class="is-uppercase">'Voyage au bout du monde' est un outil développé le groupe <a href="https://www.sowalfin.be">Sowalfin</a>.</p>
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
  .logo-container {
    height: 3em;
    width: 6em;
    display: flex;
  }
  .logo-container:not(:last-child) {
    padding-right: 0.5em;
    border-right: 1px solid gray;
    margin-right: 0.5em;
  }
  #sowalfin-creation {
    max-width: 5em;
    margin:auto;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  #footer-container {
    max-width: 70%;
    font-weight: 700;
  }
</style>