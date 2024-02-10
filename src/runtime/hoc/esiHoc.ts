import { defineComponent, h, resolveComponent } from 'vue';
import type { DefineComponent, Component } from 'vue';

interface ExtraHeaders {
  [key: string]: string;
}

export function esiHoc<T extends Component>(WrappedComponent: T, extraHeaders: ExtraHeaders = {}): DefineComponent {
  const extraH: ExtraHeaders = {
    ...extraHeaders
  }

  return defineComponent({
    name: `${WrappedComponent.name}-EsiHocComponent`,
    inheritAttrs: false,
    setup(props, { attrs }) {
      return () => {
        const esiIncludeComponent = resolveComponent('EsiInclude');

        return h(esiIncludeComponent, {
          componentName: WrappedComponent.name,
          extraHeaders: extraH,
          ...attrs
        })
      }
    },
  })
}