var PageView = require('./basePage');
var templates = require('../templates');
var TodoView = require('../views/todoView');
var _ = require('underscore');

module.exports = PageView.extend({
    pageTitle: 'todo demo',

    template: templates.pages.todoPage,

    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function () {
        this.listenTo(app.todos, 'add', this.addOne);
        this.listenTo(app.todos, 'remove', this.removeOne);
        this.listenTo(app.todos, 'filter', this.filterAll);
        this.listenTo(app.todos, 'change:completed', this.todoCompleted);

        // this marks the correct filter item selected
        app.history.on('route', this.updateActiveFilter, this);
    },

    render: function () {
        this.renderAndBind();
        this.renderCollection(this.collection, TodoView, this.$('#todo-list')[0]);

        this.$input = this.$('#new-todo');
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');
        this.$buttonClearCompleted = this.$('button#clear-completed');

        if (!this.collection.length) {
            this.fetchCollection();
        }

        this.stats();
    },

    todoCompleted: function () {
        this.stats();
    },

    stats: function() {
        if (app.todos.length) {
            this.$main.show();
            this.$footer.show();

            var completed = app.todos.completed().length;

            this.$buttonClearCompleted.text('Clear completed (' + completed + ')');
            this.$buttonClearCompleted.show(completed > 0);

            var remaining = app.todos.remaining().length;

            this.$('span#todo-count').html('<strong>' + remaining + '</strong> ' + (remaining === 1 ? 'item' : 'items' + ' left'));

            this.allCheckbox.checked = !remaining;
        } else {
            this.$main.hide();
            this.$footer.hide();
        }
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (todo) {
        this.stats();
    },

    removeOne: function (todo) {
        this.stats();
    },

    filterOne: function (todo) {
        todo.trigger('visible');
    },

    filterAll: function () {
        app.todos.each(this.filterOne, this);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function () {
        return {
            title: this.$input.val().trim(),
            order: app.todos.nextOrder(),
            completed: false
        };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function (e) {
        if (e.which === ENTER_KEY && this.$input.val().trim()) {
            var newTodo = app.todos.create(this.newAttributes());
            this.$input.val('');
            this.itemsLeft();
            this.filterAll(newTodo);
        }
    },

    // Clear all completed todo items, destroying their models.
    clearCompleted: function () {
        _.invoke(app.todos.completed(), 'destroy');
        return false;
    },

    toggleAllComplete: function () {
        var completed = this.allCheckbox.checked;

        app.todos.each(function (todo) {
            todo.save({
                completed: completed
            });
        });
    },

    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },

    updateActiveFilter: function () {
        var pathname = window.location.pathname;
        $('#filters a').each(function () {
            var navArray = _.compact($(this).attr('href').split('/')).join('/').toLowerCase();
            var pathArray = _.compact(pathname.split('/')).join('/').toLowerCase();

            if (pathArray === navArray) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    }
});