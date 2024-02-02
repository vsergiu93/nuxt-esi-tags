import {defineComponent, h, resolveComponent} from 'vue';
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

        const esiIncludeComponent = resolveComponent('EsiInclude');

        return h(esiIncludeComponent, {
          componentName: componentName,
          extraHeaders: extraH,
          ...attrs
        })
      }
    },
  })
}
