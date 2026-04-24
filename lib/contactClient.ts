export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

const getContactEndpoint = () => {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  return endpoint?.trim() || null;
};

const contact = async (payload: ContactPayload) => {
  const endpoint = getContactEndpoint();

  if (!endpoint) {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return {
      ok: true,
      mode: "local-fallback" as const,
      payload,
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contact request failed with status ${response.status}`);
  }

  return response;
};

export default contact;
