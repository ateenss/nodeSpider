module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "extends": [
        "airbnb"
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