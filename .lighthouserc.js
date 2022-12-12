module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      url: [
        'http://localhost:3001',
        'http://localhost:3001/shop',
        'http://localhost:3001/shop/1',
        'http://localhost:3001/search',
        'http://localhost:3001/search?value=re',
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
