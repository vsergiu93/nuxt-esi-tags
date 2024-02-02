import {defineComponent, h} from "vue";
import {withQuery} from "ufo";

export default defineComponent({
  name: 'EsiInclude',
  inheritAttrs: false,
  props: {
    componentName: {
      required: true,
      type: String,
    },
    extraHeaders: {
      type: Object,
      required:true
    }
  },
  setup(props, {attrs}) {
    return () => {
      const componentName = props.componentName;

      function filterFunction<T extends [string, unknown]>(pair: T): boolean {
        return Boolean(pair[1]) && pair[1] !== ''
      }

      const url = withQuery(`/__nuxt_esi_tag_renderer/${componentName}`, {
        props: JSON.stringify(Object.fromEntries(Object.entries(attrs).filter(filterFunction))),
        extraHeaders: JSON.stringify(Object.fromEntries(Object.entries(props.extraHeaders).filter(filterFunction))),
      });

      return h('esi:include', {
        src: url
      })
    }
  },
})
