// Communication with stats module
export async function sendTimestampTelemetry(part: string, chapter: string, nodeId: string, attributionKey: string, attributionValue: number) {
  const data = new FormData();
  data.append('timestamp[part]', part);
  data.append('timestamp[chapter]', chapter);
  data.append('timestamp[node_id]', nodeId);
  data.append('timestamp[attribution_key]', attributionKey);
  data.append('timestamp[attribution_value]', String(attributionValue));
  // N.B: uid (ip address) is set server side

  const response = await fetch('http://localhost:3000/timestamps', { // TODO: update this
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: data,
  });

  if (!response.ok) {
    console.error(`ERROR ${response.status}: ${response.statusText})`);
  }
}

export async function sendResultsTelemetry(attributions) {
  const data = new FormData();
  Object.keys(attributions).forEach((role) => {
    data.append(`profile[${role}]`, String(attributions[role]));
  });
  // N.B: uid (ip address) is set server side

  const response = await fetch('http://localhost:3000/profiles', { // TODO: update this
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: data,
  });

  if (!response.ok) {
    console.error(`ERROR ${response.status}: ${response.statusText})`);
  }
}