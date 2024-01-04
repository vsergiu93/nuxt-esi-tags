import {type ComponentOptions, type Component, type ExtractPropTypes, h} from 'vue';
import {withQuery} from "ufo";

export function esiHoc<T extends Component>(WrappedComponent: T, extraHeaders: Record<string, string> = {}): ComponentOptions<ExtractPropTypes<T>> {
  const extraH = {
    'Cache-Control': 'max-age=120',
    ...extraHeaders
  }
  return {
    name: 'EsiHocComponent',
    inheritAttrs: false,
    render() {
      const componentName = WrappedComponent?.name;

      const url = withQuery(`/__nuxt_esi_tag_renderer/${componentName}`, {
        props: JSON.stringify(Object.fromEntries(Object.entries(this.$attrs).filter(([_, v]) =>  v != null && v !== undefined && v !==''))),
        extraHeaders: JSON.stringify(Object.fromEntries(Object.entries(extraH).filter(([_, v]) =>  v != null && v !== undefined && v !==''))),
      });

      return h('esi:include', {
        src: url
      })
    }
  }
}
