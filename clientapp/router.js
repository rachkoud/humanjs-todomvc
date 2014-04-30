/*global app*/
var Backbone = require('backbone');
var TodoDemo = require('./pages/todoPage');


module.exports = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    // ------- ROUTE HANDLERS ---------
    setFilter: function (param) {
        if (!app.currentPage)
        {
            this.trigger('newPage', new TodoDemo({
                collection: app.todos
            }));
        }

        // Set the current filter to be used
        app.TodoFilter = param || '';

        // Trigger a collection filter event, causing hiding/unhiding
        // of Todo view items
        app.todos.trigger('filter');
    }
});
