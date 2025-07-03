import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  components: {
    inputtext: {},
    textarea: {},
    select: {},
    button: {},
    iconfield: {},
    avatar: {},
    tag: {},
    dialog: {},
    popover: {},
  },
  semantic: {
    colorScheme: {
      primary: {
        50: '#DFFCFF',
        100: '#ABF8FF',
        200: '#00EEFA',
        300: '#00D8E3',
        400: '#00C3CD',
        500: '#00B0B9',
        600: '#008A91',
        700: '#00666C',
        800: '#004549',
        900: '#002629',
        950: '#00191B',
      },
    },
  },
});

export default MyPreset;
