export function mockFetch<T>(response: Partial<T>, status = 200) {
  return jest.fn()
    .mockImplementation((_: RequestInfo) => Promise.resolve<Partial<Response>>({
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      status,
      ok: status < 400,
    }));
}
