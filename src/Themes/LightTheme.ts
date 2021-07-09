import { createTheme } from '@chainsafe/common-theme';

export const lightTheme = createTheme({
  globalStyling: {
    body: {
      backgroundColor: '#FFFFFF',
    },
  },
  themeConfig: {
    constants: {
      navItemHeight: 42,
    },
    palette: {
      additional: {
        general: {
          1: '#2762FF', // Accents //geekblue4
        },
        transferUi: {
          1: '#595959', // FAQ button // gray8
        },
        header: {
          1: '#F5F5F5', // Background
          2: '#595959', // Text color //gray8
          3: '#BFBFBF', // border // gray6
        },
        preflight: {
          1: '#2762FF', // Button bg color
          2: '#262626', // Button color
        },
        transactionModal: {
          1: '#2762FF', // border //geekblue5 #597EF7
          2: '#2762FF', // indicator border //geekblue4
          3: '#2762FF', // indicator text //geekblue6 #2F54EB
        },
      },
    },
    overrides: {
      CheckboxInput: {
        root: {
          alignItems: 'center',
        },
      },
      Button: {
        variants: {
          primary: {
            root: {
              borderRadius: '40px',
              backgroundColor: '#262626',
              color: '#ffffff',
              border: `1px solid #262626`,
              '& svg': {
                fill: '#ffffff',
              },
            },
            active: {
              backgroundColor: '#ffffff',
              color: '#262626',
              '& svg': {
                fill: '#262626',
              },
            },
            hover: {
              backgroundColor: '#ffffff',
              color: '#262626',
              '& svg': {
                fill: '#262626',
              },
            },
            focus: {
              backgroundColor: '#ffffff',
              color: '#262626',
              '& svg': {
                fill: '#262626',
              },
            },
          },
          outline: {
            root: {
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: `1px solid #ffffff`,
              '& svg': {
                fill: '#ffffff',
              },
            },
            active: {
              backgroundColor: '#ffffff',
              color: '#262626',
              borderColor: '#ffffff',
              '& svg': {
                fill: '#262626',
              },
            },
            hover: {
              backgroundColor: '#ffffff',
              color: '#262626',
              borderColor: '#ffffff',
              '& svg': {
                fill: '#262626',
              },
            },
            focus: {
              backgroundColor: '#ffffff',
              color: '#262626',
              borderColor: '#ffffff',
              '& svg': {
                fill: '#262626',
              },
            },
          },
        },
      },
    },
  },
});
