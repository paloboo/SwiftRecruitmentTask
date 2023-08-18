import { defineStore } from 'pinia';

export default defineStore('mainStore', {
    state: () => ({
        colors: {
            backgroundOpacity: {
                light: 'rgba(0, 0, 0, 0.7)',
                dark: 'rgba(47, 47, 47, 0.8)'
            },
            blue200: {
                light: '#E5F0FF',
                dark: '#193153',
            },
            blue500: {
                light: '#EFF0FF',
                dark: '#253153'
            },
            blue800: {
                light: '#0060EF',
                dark: '#4D94FF',
            },
            gray200: {
                light: '#EDEDED',
                dark: '#303030',
            },
            gray400: {
                light: '#DDDDDD',
                dark: '#EDEDED',
            },
            gray500: {
                light: '#DDDDDD',
                dark: '#646464',
            },
            gray600: {
                light: '#DDDDDD',
                dark: '#4E4E4E',
            },
            gray800: {
                light: '#141414',
                dark: '#222222',
            },
            neutral0: {
                light: '#FFFFFF',
                dark: '#222222',
            },
            neutral100: {
                light: '#FFFFFF',
                dark: '#717171',
            },
            neutral150: {
                light: '#FFFFFF',
                dark: '#303030',
            },
            neutral200: {
                light: '#E5E5E5',
                dark: '#3E3E3E',
            },
            neutral300: {
                light: '#F2F2F2',
                dark: '#4E4E4E',
            },
            neutral900: {
                light: '#141414',
                dark: '#FAFAFA',
            },
            red100: {
                light: '#FFEEEE',
                dark: '#4A0505',
            },
            red300: {
                light: '#CC1F14',
                dark: '#FF5456',
            },
            red500: {
                light: '#FF2E2F',
                dark: '#FF5456',
            },
            red600: {
                light: '#B40001',
                dark: '#F06E6F',
            },
            red700: {
                light: '#A31910',
                dark: '#FFA1A2',
            },
            slate100: {
                light: '#F8F8F8',
                dark: '#141414',
            },
            zinc500: {
                light: '#717171',
                dark: '#9D9D9D',
            },
            transparent: {
                light: 'transparent',
                dark: 'transparent'
            }
        },
        displayMode: 'light',
        language: 'pl',
    }),
    getters: {
        displayColorGetter: (state) => {
            return (colorName) => state.colors[colorName][state.displayMode];
        }
    },
})
