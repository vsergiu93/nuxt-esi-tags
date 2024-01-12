import {defineComponent, h} from 'vue';
import {withQuery} from "ufo";
import type {DefineComponent, Component} from "vue";

export function esiHoc<T extends Component>(WrappedComponent: T, extraHeaders: Record<string, string> = {}): DefineComponent {
  const extraH = {
    'Cache-Control': 'max-age=120',
    ...extraHeaders
  }

  return defineComponent({
    name: 'EsiHocComponent',
    inheritAttrs: false,
    setup(props, {attrs}) {
      return () => {
        const componentName = WrappedComponent.name;

        function filterFunction<T extends [string, unknown]>(pair: T) : boolean {
          return Boolean(pair[1]) && pair[1] !== ''
        }

        const url = withQuery(`/__nuxt_esi_tag_renderer/${componentName}`, {
          props: JSON.stringify(Object.fromEntries(Object.entries(attrs).filter(filterFunction))),
          extraHeaders: JSON.stringify(Object.fromEntries(Object.entries(extraH).filter(filterFunction))),
        });

        return h('esi:include', {
          src: url
        })
      }
    },
  })
}
