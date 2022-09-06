export function generateBadgeeHashURL(gameState: GameState) {
  // We build a query and then base64 hash it to send as a GET request
  const d = new Date();
  const time = d.getDate().toString().padStart(2, '0') + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getFullYear() + '-' + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');

  const request = [
    ['P2B', true],
    ['date', time],
    ['part', '1'],
    ['gender', gameState.gender],
    ['leader', gameState.attribution.leader],
    ['bricoleur', gameState.attribution.bricoleur],
    ['coequipier', gameState.attribution.coequipier],
    ['planificateur', gameState.attribution.planificateur],
    ['idealiste', gameState.attribution.idealiste],
    ['creatif', gameState.attribution.creatif],
    ['audacieux', gameState.attribution.audacieux],
    ['explorateur', gameState.attribution.explorateur],
  ].map(([k, v]) => `${k}=${v}`).join('&');
  const hash = btoa(request);

  return `https://www.badgee.net/autodiagnostic_results/${hash}`;
}