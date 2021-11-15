<script lang="ts">
  export let profileName;
  const profiles = {
    leader: {
      desc: "<p>On dit de toi que tu es inspirant et motivant ! Et oui, qui d'autre que toi pour guider les autres qui, assez spontanément, t'écoutent et te suivent. Ton dynamisme et ta motivation donnent les impulsions nécessaires pour que se forme autour de toi une équipe véritablement engagée dans les actions ou le projet que tu portes.</p>\
      <p>Les autres te sollicitent tout naturellement pour prendre des responsabilités. Et quand on te confie une tâche, non seulement tu l'acceptes volontiers, mais tu l'accomplis avec zèle et de façon souvent très autonome.</p>\
      <p>Enfin, force est de constater que tu es un excellent ambassadeur ! Tu es donc sollicité lorsqu'il s'agit de présenter et défendre un projet devant tous types de publics. Bref, tu es aussi le porte-voix de l'équipe, rôle qui te plait particulièrement.</p>",
      advice: "<p>Ce talent inné que tu as pour guider et inspirer les autres ne doit pas t'empêcher d'être aussi à l'écoute des autres, les soutenir, « faire équipe » avec eux, cela te permettra de combiner les talents du leader et du coéquipier, deux profils souvent opposés, alors qu'ils sont en réalité très complémentaires !</p>",
    },
    bricoleur: {
      desc: "<p>Alors toi, on peut dire que tu es débrouillard ! Tout ce que tu as, à portée de main, tu l'utilises pour en faire quelque chose. Bref, rien ne se perd, tout peut servir … Te servir, en l'occurrence, car tu es une personne motivée, passionnée, qui se lance volontiers dans les nouveaux défis. Et tu avances, par essai-erreur, avec les ressources dont tu disposes et en n'hésitant pas non plus à faire appel à toute autre personne qui pourrait t'aider utilement dans tes projets.</p>\
      <p>Ton fonctionnement te permet de vite comprendre ce qui ne fonctionnera pas. Mais cela ne te décourage pas, au contraire, tu reconfigures, tu tentes autre chose, tu recommences. Cela fait partie des risques de ta façon « bricolée » d'avancer, mais tu aimes ça !</p>",
      advice: "<p>Ce talent inné que tu as pour improviser les choses ne doit pas t'empêcher d'un peu les prévoir aussi, bref prends le temps de réfléchir et d'anticiper les évènements, cela te permettra de combiner les talents du bricoleur et du planificateur, deux profils souvent opposés, alors qu'ils sont en réalité très complémentaires !</p>",
    },
    coequipier: {
      desc: "<p>Toi, tu es « comme un poisson dans l'eau » quand tu es dans un collectif. Être avec les autres, mais aussi et surtout, faire en sorte qu'ensemble, vous « fassiez équipe », voilà ce qui te motive. Et tu peux d'ailleurs jouer différents rôles, prendre différentes casquettes dans l'équipe pour qu'elle atteigne les objectifs qu'elle s'est fixés.</p>\
      <p>Ton attitude est appréciée des autres, car, loin de vouloir t'exprimer et avoir raison à tout prix, tu commences toujours par observer ce qui se passe et écouter attentivement ce que les autres ont à dire. En d'autres mots, l'écoute et le respect de chacun, sont importants à tes yeux. Ceci étant, ton avis est attendu et le collectif n'hésite jamais à te solliciter, te consulter, te mobiliser.</p>\
      <p>On peut enfin et surtout compter sur toi pour remotiver les troupes dans les moments les plus difficiles, mais aussi réconforter, rassurer, l'un ou l'autre quand il/elle ne va pas. Tu arrives en effet à te mettre à la place des autres, à les comprendre, et surtout tu les soutiens, les réconfortes. C'est ce que l'on appelle l'empathie ! Voilà une qualité bien précieuse...</p>",
      advice: "<p>Ton sens de l'autre, cette empathie qui te caractérise tant, n'hésite pas à les mettre aussi au service de la société au sens plus large, pour un monde meilleur porté par des valeurs, cela te permettra d'associer les talents du coéquipier et de l'idéaliste, une très belle combinaison !</p>",
    },
    planificateur: {
      desc: "<p>S'il y a bien quelqu'un qui sait où il va, et comment il va y aller, c'est toi ! Et oui, avant d'agir, tu réfléchis, tu imagines, tu projettes les choses pour qu'elles se déroulent comme tu le souhaiterais. Que me faudra-t-il avoir ? Qui pourra m'aider ? Que dois-je savoir ou savoir faire ? Etc. Cela veut dire que tu as d'abord déterminé, de façon précise, ton ou tes objectifs. S'ensuit la mise au point d'un plan balisé en quelques grandes étapes. Bref, tu mets au point une véritable scénarisation de tes actions. Et tu définis souvent plusieurs scenarii (plan A, B, C …) pour t'assurer de tout anticiper, tout maîtriser.</p>\
      <p>Une fois ton plan lancé, tu t'attaches à suivre, pas à pas, chacune des tâches prévues. Cela te permet de bien évaluer ton avancement et donc de vérifier si tu es dans les temps par rapport à tes prévisions de départ. Cette maîtrise de choses et de leur déroulement, mais aussi ton état permanent de vigilance sur ce qui se passe et pourrait mettre à mal tes plans, te permet d'absorber les obstacles et surprises rencontrés en effectuant rapidement les changements nécessaires. Cette flexibilité doit garantir la poursuite de ton objectif de départ.</p>",
      advice: "<p>Ne reste pas trop absorbé par ton besoin de tout contrôler, lâche prise aussi, en accueillant les imprévus pour explorer autre chose, cela te permettra de combiner les talents du planificateur et du bricoleur, deux profils souvent opposés, alors qu'ils sont en réalité très complémentaires !</p>",
    },
    idealiste: {
      desc: "<p>S'il y a bien quelqu'un qui a des convictions, c'est toi ! Différentes causes dans ce monde en transition te sont chères et tu n'hésites pas à l'afficher, à le revendiquer même parfois lorsque ton engagement se mue en véritable militantisme. Il s'agit pour toi de ne pas rester les bras croisés, mais d'agir pour défendre ou mener des combats qui permettront un avenir meilleur, un avenir que tu juges souhaitable. Tu apprécies d'ailleurs les échanges qui permettent de débattre de ces changements provoqués par l'action humaine et donc des enjeux de durabilité.</p>\
      <p>Ton idéalisme guide également tes choix. Ainsi, si quelqu'un te sollicite pour prendre part à un projet, tu ne prends pas la proposition « à la légère » en l'acceptant d'emblée. Non, tu réfléchis ; tu pèses le « pour » et le « contre » par rapport à qui tu es, tes aspirations, tes valeurs. Parmi ces valeurs, l'intégrité, l'honnêteté, le courage et l'engagement sont particulièrement importantes. Tu n'accepteras en fin de compte que si tu estimes le projet aligné sur ta vision du monde et les causes que tu défends.</p>",
      advice: "<p>N'hésite pas à t'engager comme porte-voix, comme ambassadeur, de tes nobles combats, cela te permettra d'associer les talents de l'idéaliste et du leader, une belle combinaison !</p>",
    },
    creatif: {
      desc: "<p>Alors toi, tu es vraiment curieux de tout, ouvert d'esprit, attentif à l'environnement dans lequel tu te trouves et aux personnes présentes. Tu as beaucoup d'intuition aussi. Cela te permet d'identifier facilement des besoins pour lesquels il conviendrait de trouver des solutions originales.</p>\
      <p>Quand une situation, un problème, ou encore un projet nécessitent de trouver des idées originales, c'est donc incontestablement à toi que les autres songent. Et oui, tes capacités créatives sont connues et reconnues ! Qui d'autre, mieux que toi, serait capable d'émettre beaucoup d'idées et, de bonnes idées, de surcroît ? Tu as en effet ce talent d'avoir des idées, mais aussi de rebondir sur celles des autres, par associations, métaphores ou autres techniques, pour continuer à en produire encore de nouvelles.</p>\
      <p>Tu parviens également à évaluer la valeur, la pertinence, le degré d'originalité d'idées émises (les tiennes et celles des autres), ce qui est bien utile quand arrive le moment de faire un choix.</p>",
      advice: "<p>N'hésite pas à nourrir les autres de tes brillantes idées pour « faire équipe » avec eux autour de nouveaux projets, cela te permettra d'associer les talents du créatif et du coéquipier, une belle combinaison !</p>",
    },
    audacieux: {
      desc: "<p>Alors, toi, on peut dire que tu es quelqu'un « qui en veut » dans la vie ! Cela bouillonne dans ta tête entre les projets que tu veux réaliser, ces personnes que tu dois absolument rencontrer, sans oublier ces lieux que tu juges essentiels de découvrir, etc. Bref, tu sais ce qui te fait rêver, ce qui t'intéresse et tu sais où tu vas. Chaque objectif atteint fait place au suivant, celui qui reste à relever, puisque tu es en perpétuel mouvement, en action.</p>\
      <p>L'échec ne te fait pas peur. Au contraire, tu t'en saisis pour mieux comprendre pourquoi les choses n'ont pas fonctionné comme tu l'avais imaginé, pour rebondir, faire autrement ; bref repartir sur le chemin trépidant de ce que tu veux encore accomplir.</p>\
      <p>Tu relèves souvent avec succès les défis que tu te lances parce que tu crois en toi, en tes capacités, tes habilités et tes connaissances, pour y parvenir. Avec une telle confiance en toi et un tel optimisme, tu fais bouger les lignes ; tu déplaces des montagnes ; bref tu accomplis des missions qui te profitent, certes, mais qui peuvent aussi profiter aux autres et à la société en général.</p>",
      advice: "<p>N'hésite pas à utiliser ta confiance en toi et ta soif d'avancer pour construire des projets porteurs de sens, de valeurs, pour un monde meilleur, cela te permettra d'associer les talents de l'audacieux et de l'idéaliste, une belle combinaison !</p>",
    },
    explorateur: {
      desc: "<p>Le moins que l'on puisse dire est que tu es quelqu'un d'attentif, de vigilant. Tu observes minutieusement les autres, les choses, bref l'environnement et les situations dans lesquelles tu te trouves. Cela te permet de voir, comprendre, et de décrypter beaucoup d'informations. Ces observations, leur fine évaluation, mais aussi ton intuition te conduisent à repérer les opportunités qui se présentent sur ton chemin (projets, défis, rencontres, idées, etc.) et à les saisir !</p>\
      \
      <p>On peut aussi dire de toi que tu as le goût de l'aventure. L'imprévu, les soucis, voire l'échec ne te font pas peur. Au contraire, tu t'en saisis pour mieux comprendre ton environnement, rebondir, faire autrement ; bref repartir sur le chemin trépidant de ce qui reste encore à découvrir.</p>\
      \
      <p>Au fil de tes aventures et explorations, tu développes de l'expérience, ce qui te permet de mieux évaluer encore ce qu'il faut faire, ne pas faire ; ce qu'il faut éviter ou, au contraire, ce qu'il faut rechercher à tout prix.</p>",
      advice: "<p>N'hésite pas à utiliser ton sens de l'observation et tes intuitions pour identifier de nouveaux besoins, des défis, et penser à leurs solutions, cela te permettra d'associer les talents de l'explorateur et du créatif, une belle combinaison !</p>",
    },
  };
</script>

<h4>
  <svg class="icon scroll">
    <use href='assets/sprite_icons.svg#scroll' />
  </svg>
  Description :
</h4>
{@html profiles[profileName].desc}

<h4>
  <svg class="icon lightbulb">
    <use href='assets/sprite_icons.svg#lightbulb' />
  </svg>
  Un conseil :
  </h4>
{@html profiles[profileName].advice}

<style lang="scss">
  h4 {
    margin-top: 0;
  }
  h4::after {
    content: "";
    height: 0.5em;
    background: url("/assets/images/horizontal_bar_subtitle.svg");
    background-repeat: no-repeat;
    display: inline-block;
    width: 75%;
  }
  .lightbulb, .scroll {
    fill: red;
  }
</style>