Package.describe({
  name: 'loanly:auto-investment',
  version: '0.0.1',
  summary: 'Package to generate portfolio',
  git: 'https://github.com/smirnovigor/loanly',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.addFiles('lib/autoInvestmentController.js', ['server']);
  api.addFiles('methods/methods.js', ['server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('loanly:auto-investment');
  api.addFiles('test/autoInvestmentController.js');
});
