module.exports = {
  purge: ['./pages/**/*.jsx', './pages/**/*.tsx', './parts/**/*.jsx', './parts/**/*.tsx'],
  theme: {
    screens: {
      mobile: '400px', // RESPONSIVE LAYOUT, MOBILE DEVICES 400px AND UP GET FULL FONT SIZE THROUGHOUT THE CONTENT
      tablet: '640px', // RESPONSIVE LAYOUT
      laptop: '1024px', // RESPONSIVE LAYOUT
    },
    fontFamily: {
      sans:
        '"Inter","Open Sans", Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    extend: {
      spacing: {
        7: '1.75rem',
        9: '2.25rem',
        px2: '2px',
        px3: '3px',
        px4: '4px',
        px5: '5px',
        px6: '6px',
        px7: '7px',
        px8: '8px',
        px9: '9px',
        px10: '10px',
        px25: '25px',
        px40: '40px',
        px50: '50px',
        px55: '55px',
        px60: '60px',
        px65: '65px',
        px70: '70px',
        px75: '75px',
        px80: '80px',
        px85: '85px',
        px90: '90px',
        px95: '95px',
        px100: '100px',
        px125: '125px',
        px150: '150px',
        px175: '175px',
        px200: '200px',
        px225: '225px',
        px250: '250px',
        px275: '275px',
        px300: '300px',
        px325: '325px',
        px350: '350px',
        px375: '375px',
        px400: '400px',
        px425: '425px',
        px450: '450px',
        px475: '475px',
        px500: '500px',
        px525: '525px',
        px550: '550px',
        px575: '575px',
        px600: '600px',
        px625: '625px',
        px650: '650px',
        px675: '675px',
        px700: '700px',
        px725: '725px',
        px750: '750px',
        px775: '775px',
        px800: '800px',
        px825: '825px',
        px850: '850px',
        px875: '875px',
        px900: '900px',
        px925: '925px',
        px950: '950px',
        px975: '975px',
        px1000: '1000px',
        px1050: '1050px',
        px1100: '1100px',
        px1150: '1150px',
        px1165: '1165px',
        px1200: '1200px',
        /* helper for horizontal scroll width setting */
        '1/1dot5': '66%',
        '1/2': '50%',
        '1/2dot5': '40%',
        '1/3': '33%',
        '1/3dot25': '31%',
        '1/3dot5': '29%',
        '1/3dot75': '27%',
        '1/4': '25%',
        '1/4dot5': '22%',
        '1/5': '20%',
        '1/5dot5': '18%',
        '1/6': '16.5%',
        '1/6dot5': '15.3%',
        '1/7': '14.3%',
        '1/7dot5': '13.3%',
        '1/8': '12.5%',
        '1/8dot5': '11.7%',
        '1/9': '11.1%',
        '1/9dot5': '10.5%',
        '1/10': '10%',
      },
      fontSize: {
        /* 'xs': 0.75rem; is smallest one, the least legible one */
        '2xs': '0.70rem',
        '3xs': '0.65rem',
        '4xs': '0.60rem',
        '5xs': '0.55rem',
        '6xs': '0.50rem',
        '7xs': '0.45rem',
        '8xs': '0.40rem',
        '9xs': '0.35rem',
      },
      borderRadius: {
        /* 'rounded-lg': 0.5rem; is biggest one */
        xl: '0.6rem',
        '2xl': '0.7rem',
        '3xl': '0.8rem',
        '4xl': '0.9rem',
        '5xl': '1rem',
        '6xl': '1.1rem',
      },
      minWidth: {
        /* helper for horizontal scroll width setting */
        '1/1dot5': '66%',
        '1/2': '50%',
        '1/2dot5': '40%',
        '1/3': '33%',
        '1/3dot25': '31%',
        '1/3dot5': '29%',
        '1/3dot75': '27%',
        '1/4': '25%',
        '1/4dot5': '22%',
        '1/5': '20%',
        '1/5dot5': '18%',
        '1/6': '16.5%',
        '1/6dot5': '15.3%',
        '1/7': '14.3%',
        '1/7dot5': '13.3%',
        '1/8': '12.5%',
        '1/8dot5': '11.7%',
        '1/9': '11.1%',
        '1/9dot5': '10.5%',
        '1/10': '10%',
      },
      maxWidth: {
        /* helper for horizontal scroll width setting */
        '1/1dot5': '66%',
        '1/2': '50%',
        '1/2dot5': '40%',
        '1/3': '33%',
        '1/3dot25': '31%',
        '1/3dot5': '29%',
        '1/3dot75': '27%',
        '1/4': '25%',
        '1/4dot5': '22%',
        '1/5': '20%',
        '1/5dot5': '18%',
        '1/6': '16.5%',
        '1/6dot5': '15.3%',
        '1/7': '14.3%',
        '1/7dot5': '13.3%',
        '1/8': '12.5%',
        '1/8dot5': '11.7%',
        '1/9': '11.1%',
        '1/9dot5': '10.5%',
        '1/10': '10%',
      },
    },
  },
  variants: {},
  plugins: [],
};
