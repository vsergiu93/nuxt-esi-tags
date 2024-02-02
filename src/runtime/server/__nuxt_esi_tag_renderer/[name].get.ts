import { getQuery, getRouterParam, setHeaders, defineEventHandler } from "h3";

export default defineEventHandler<{
  query: {
    extraHeaders?: string
    props?: string
  }
}>(async (event) => {
  const name = getRouterParam(event, 'name');
  const query = getQuery(event);

  if (query.extraHeaders) {
    const extraHeaders = JSON.parse(query.extraHeaders)
    setHeaders(event, extraHeaders);
  }


  const response = await $fetch<{ html: string }>(`/__nuxt_island/${name}`, {
    query,
    // Set the headers returned by nuxt island route, maybe some custom headers where set inside the component.
    onResponse(context): Promise<void> | void {
      for (const [name, value] of context.response.headers.entries()) {
        setHeaders(event, {
          [name]: value
        })
      }
    }
  });

  // We are only returning the html from NuxtIslandResponse, we might as well set the proper content type.
  setHeaders(event, {
    'content-type': 'text/html'
  })

  return response.html;
});
