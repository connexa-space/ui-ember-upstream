'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall() {

    return this.addAddonsToProject({
      //Ember packages
      
      packages: [],

    }).then(() => {
      //NPM packages

      return this.addPackagesToProject([
        { name: 'video.js' },
        { name: '@videojs/http-streaming' },
      ]);

    }).then(() => {
      //SCSS

      let dependencies = this.project.dependencies();
      let type;
      let importStatement = '\n@import "upstream";\n';

      if ('ember-cli-sass' in dependencies) {
        type = 'scss';
      } else if ('ember-cli-less' in dependencies) {
        type = 'less';
      }

      if (type) {
        let stylePath = path.join('app', 'styles');
        let file = path.join(stylePath, `app.${type}`);

        if (!fs.existsSync(stylePath)) {
          fs.mkdirSync(stylePath);
        }
        if (fs.existsSync(file)) {
          this.ui.writeLine(`Added import statement to ${file}`);
          return this.insertIntoFile(file, importStatement, {});
        } else {
          fs.writeFileSync(file, importStatement);
          this.ui.writeLine(`Created ${file}`);
        }
      }

    });
  },
};