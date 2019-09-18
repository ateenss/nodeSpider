module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb","eslint:recommended", "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", "jsx-a11y", "import"
    ],
    "rules": {
        "quotes": [
            "error", "single"
        ],
        "semi": [
            "error", "always"
        ],
        "react/jsx-uses-vars": 1,
        "react/jsx-uses-react": 1,
        "no-console": "off"
    }
};