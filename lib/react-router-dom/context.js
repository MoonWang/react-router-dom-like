import React from 'react';

const ThemeContext = React.createContext({
    history: {
        push: () => {}
    },
    location: {
        pathname: ''
    }
});

export default ThemeContext;