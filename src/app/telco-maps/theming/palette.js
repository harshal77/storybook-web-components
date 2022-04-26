module.exports = {
  'mat-light-theme-background': {
    'status-bar': 'map_get($mat-grey, 300)',
    'app-bar': 'map_get($mat-grey, 100)',
    background: ' #f8f9fa',
    hover: '#f2f4f8',
    card: '#ffffff',
    'card-accent': '#f0f7fd',
    dialog: 'rgb(5, 5, 5)',
    'disabled-button': '#d8d8d8',
    'raised-button': 'white',
    'focused-button': '$dark-focused',
    'selected-button': 'map_get($mat-grey, 300)',
    'selected-disabled-button': 'map_get($mat-grey, 400)',
    'disabled-button-toggle': 'map_get($mat-grey, 200)',
    'unselected-chip': 'map_get($mat-grey, 300)',
    'disabled-list-option': 'map_get($mat-grey, 200)',
    'card-hover': '#e1f2fa',
  },

  'mat-light-theme-foreground': {
    base: '#595959',
    divider: ' #dadce0',
    dividers: '#dadce0',
    disabled: '#bec2c5',
    'disabled-button': 'rgba(black, 0.26)',
    'disabled-text': '#bec2c5',
    elevation: 'black',
    'hint-text': '#bec2c5',
    'secondary-text': '#acacac',
    icon: 'rgba(black, 0.54)',
    icons: 'rgba(black, 0.54)',
    text: '#595959',
    'slider-min': 'rgba(black, 0.87)',
    'slider-off': 'rgba(black, 0.26)',
    'slider-off-active': 'rgba(black, 0.38)',
  },

  'iro-primary': {
    50: '#ecf0fe',
    100: '#cfd9fc',
    200: '#afc0fa',
    300: '#8ea7f7',
    400: '#7694f6',
    500: '#5e81f4',
    600: '#5679f3',
    700: '#4c6ef1',
    800: '#4264ef',
    900: '#3151ec',
    A100: '#ffffff',
    A200: '#fcfdff',
    A400: '#c9d2ff',
    A700: '#b0bcff',
  },

  'iro-accent': {
    50: '#e1f9f4',
    100: '#b5efe3',
    200: '#84e5d0',
    300: '#53dbbd',
    400: '#2ed3ae',
    500: '#09cba0',
    600: '#08c698',
    700: '#06be8e',
    800: '#05b884',
    900: '#02ac73',
    A100: '#d5ffef',
    A200: '#a2ffdc',
    A400: '#6fffc9',
    A700: '#56ffbf',
  },

  'iro-warn': {
    50: '#fdeaea',
    100: '#facccc',
    200: '#f6aaaa',
    300: '#f28787',
    400: '#f06e6e',
    500: '#ed5454',
    600: '#eb4d4d',
    700: '#e84343',
    800: '#e53a3a',
    900: '#e02929',
    A100: '#ffffff',
    A200: '#ffebeb',
    A400: '#ffb8b8',
    A700: '#ff9f9f',
  },

  // -----------------------------------------------------------------------------------------------------
  // @ Additional colors here
  // -----------------------------------------------------------------------------------------------------
  // Use this map to add additional colors which do not fit in the scope of the palette
  // but are used in the application
  application: {
    // "chip": {
    //     "accent": "#597eb8"
    // },

    'palette-1': '#5e81f4',
    'palette-2': '#e04b4b',
    'palette-3': '#ffbf00',
    'palette-4': '#33b64d',
    'palette-5': '#ccb025',
    'palette-6': '#7db3f2',
    'palette-7': '#d563d7',
    'palette-8': '#28cb62',
    'palette-9': '#5cbcdd',
    'palette-10': '#d29d4d',
    'palette-11': '#df68c5',
    'palette-12': '#815daf',
  
    success: '#2ab847',
    fail: '#ed5454',
    'text-light': 'rgba(#597eb8, 0.5)',
    'palette-bg-1': ' #f4f4f4',
    'palette-text-1': '#80868b',
    'table-header-1-fg': '#f8f9ff',
    'table-header-1-bg': ' #9c9cc8',
  },

  // Only add colors which will be different for light and dark theme (will be accessible
  // using $application key), this map will override keys in $application map
  // "application-light": {
  //     "chip": {
  //         "background": "#cedde9"
  //     }
  // },

  // "application-dark": {
  //     "chip": {
  //         "background": "#3e2d39"
  //     }
  // },

  // "mychart":{
  //     "linegraph":{
  //         "background":"#cedde9"
  //     },
  //     "bargraph":{
  //         "background":"#cedde9"
  //     }
  // }
};
