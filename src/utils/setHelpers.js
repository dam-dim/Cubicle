const Handlebars = require("express-handlebars").create({});

const helpers = {
  select: () => {
    Handlebars.handlebars.registerHelper(
      "select",
      function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          );
      }
    );
  },
};

module.exports = helpers;
