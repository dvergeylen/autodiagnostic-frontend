<script lang="ts">
  const urlTrameSowalfin = `url('${[process.env.APP_PATH_PREFIX, 'assets/images/trame_sowalfin_color_06.svg'].join('/')}')`;
</script>

<footer style="--url-trame-background: {urlTrameSowalfin};">
  <div class="is-flex has-align-items-center">
    <div class="logo-container">
      <img id="sowalfin-creation" src={[process.env.APP_PATH_PREFIX, 'assets/images/logo_sowalfin_creation.svg'].join('/')} alt="Sowalfin Création"/>
    </div>
    <div class="logo-container">
      <img src={[process.env.APP_PATH_PREFIX, 'assets/images/logo_FSE_Coq_Wallonie.svg'].join('/')} alt="Logo FSE et Wallonie"/>
    </div>
    <div class="logo-container">
      <img src={[process.env.APP_PATH_PREFIX, 'assets/images/logo_EnMieux.svg'].join('/')} alt="Logo En Mieux"/>
    </div>
  </div>
  <div id="footer-container">
    <p id="moto" class="is-uppercase">'On my way' est un outil développé par le groupe <a href="https://www.sowalfin.be">Sowalfin</a>.</p>
  </div>
</footer>

<style lang="scss">
  footer {
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;

    // Phones
    @media (max-width: 768px) {
      width: 90%;
    }

    // Tablets
    @media (min-width: 769px) and (max-width: 1023px) {
      width: 90%;
    }

    // Desktops
    @media (min-width: 1024px) {
      width: 33em;
    }
  }
  footer::after {
    content: "";
    height: 2em;
    background: var(--url-trame-background);
    background-repeat: repeat-x;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;

    // Phones, Tablets
    @media (max-width: 1023px) {
      width: 100%;
    }

    // Desktops
    @media (min-width: 1024px) {
      width: 33em;
    }
  }

  #moto {
    font-size: 0.75em;
  }
  .logo-container {
    height: 3em;
    display: flex;

    // Phones, Tablets
    @media (max-width: 1023px) {
      width: 30%;
    }

    // Desktops
    @media (min-width: 1024px) {
      width: 6em;
    }
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
