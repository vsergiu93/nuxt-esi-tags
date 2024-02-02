import { defineComponent, h } from "vue";
import { withQuery } from "ufo";

const filterFunction = <T extends [string, unknown]>(pair: T): boolean => Boolean(pair[1]) && pair[1] !== '';

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
      required: true
    }
  },
  setup(props, { attrs }) {
    return () => {
      const componentName = props.componentName;

      const url = withQuery(`/__nuxt_esi_tag_renderer/${componentName}`, {
        props: JSON.stringify(Object.entries(attrs).filter(filterFunction).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: value
        }), {})),
        extraHeaders: JSON.stringify(Object.entries(props.extraHeaders).filter(filterFunction).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: value
        }), {})),
      });

      return h('esi:include', {
        src: url
      })
    }
  },
})
