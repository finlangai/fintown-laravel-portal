type SSECallback = (data: string) => void;

const makeSSERequest = async (
  endpoint: string,
  onMessage: SSECallback,
  getParams: Record<string, string> | null = {},
  postData: Record<string, any> | null = {},
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const url = new URL(endpoint);

    if (getParams) {
      Object.keys(getParams).forEach((key) => {
        url.searchParams.append(key, getParams[key]);
      });
    }

    const fetchSSE = async () => {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      reader?.read().then(function processText({ done, value }): any {
        if (done) {
          resolve();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const messages = chunk.split("\n\n");

        messages.forEach((message) => {
          if (message.startsWith("data: ")) {
            const data = message.slice(6).trim();
            onMessage(data);
          }
        });

        return reader.read().then(processText);
      });
    };

    fetchSSE().catch((error) => {
      console.error("Fetch Error:", error);
      reject(error);
    });

    // Optional: manually close the connection after some time
    setTimeout(() => {
      resolve();
    }, 1000 * 120); // Close after 120 seconds for example
  });
};

interface PythonServiceHookInterface {
  makeSSERequest: Function;
}

export const usePythonService = (): PythonServiceHookInterface => {
  return { makeSSERequest };
};
