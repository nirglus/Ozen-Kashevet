module.exports = {
    "extends": [
      "eslint:recommended",
      "airbnb-base",
      "plugin:eslint-comments/recommended",
      "plugin:promise/recommended",
      "plugin:jest/recommended",
      "plugin:node/recommended",
      "plugin:unicorn/recommended",
      "plugin:sonarjs/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      // Disable rules from packages above that could interfere with prettier
      "prettier",
      "prettier/unicorn",
      // Turn on prettier rules
      "plugin:prettier/recommended",
      // Add security rules last to make sure they are not overridden
      "plugin:security/recommended"
    ],
    "env": {
      "node": true,
      "es6": true,
      "jest": true
    },
    "plugins": [
      "eslint-comments",
      "promise",
      "jest",
      "node",
      "import",
      "unicorn",
      "sonarjs",
      "prettier",
      "security",
      "optimize-regex",
      "no-loops",
    ],
    "rules": {
      // Allow explicit any for faster development
      // Turn on optimize-regex plugin
      "optimize-regex/optimize-regex": "warn",
      // Turn on no-loops plugin
      "no-loops/no-loops": "error",
      // Allow _id because of Mongoose
      "no-underscore-dangle": ["error", { "allow": ["_id"] }],
      // Allow typescript style imports
      "node/no-unsupported-features/es-syntax": ["error", {
        "ignores": ["modules"]
      }],
      // Prettier already tries to keep code to 80 columns, but this rule attempts
      // to cover remaining cases.
      "max-len": ["error", {
        "code": 100,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreUrls": true
      }],
      // Allow disabling eslint rules for an entire file.
      // Useful for things like the logger module, where no-console is disabled.
      "eslint-comments/disable-enable-pair": ["error", {
        "allowWholeFile": true
      }]
    },
    "overrides": [{
      "files": "test/**/*.js",
      "rules": {
        // Needed to import supertest in test files
        "node/no-unpublished-require": "off"
      }
    }]
  }