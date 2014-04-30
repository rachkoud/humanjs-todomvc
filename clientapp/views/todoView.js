var HumanView = require('human-view');
var templates = require('../templates');

module.exports = HumanView.extend({
    template: templates.views.todoView,

    textBindings: {
        title: 'li label'
    },

    events: {
        'click .destroy': 'handleDestroyClick',
        'click .toggle': 'toggleCompleted',
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'keydown .edit': 'revertOnEscape',
        'blur .edit': 'close'
    },

    attributeBindings: {
        title: ['li input:not([type])', 'value']
    },

    initialize: function () {
        this.listenTo(this.model, 'change:completed', this.completed);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    render: function () {
        this.renderAndBind();

        this.$checkbox = this.$('li input[type=checkbox]');
        this.$input = this.$('.edit');

        this.completed();
    },

    toggleVisible: function () {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    isHidden: function () {
        var isCompleted = this.model.get('completed');
        return (// hidden cases only
            (!isCompleted && app.TodoFilter === 'completed') ||
            (isCompleted && app.TodoFilter === 'active')
            );
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Toggle the `"completed"` state of the model.
    toggleCompleted: function () {
        this.model.toggle();
    },

    completed: function () {
        if (this.model.completed)
        {
            $(this.el).addClass('completed');
            this.$checkbox.prop('checked', true);
        }
        else
        {
            $(this.el).removeClass('completed');
            this.$checkbox.prop('checked', false);
        }
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function () {
        var value = this.$input.val();
        var trimmedValue = value.trim();

        // We don't want to handle blur events from an item that is no
        // longer being edited. Relying on the CSS class here has the
        // benefit of us not having to maintain state in the DOM and the
        // JavaScript logic.
        if (!this.$el.hasClass('editing')) {
            return;
        }

        if (trimmedValue) {
            this.model.save({ title: trimmedValue });

            if (value !== trimmedValue) {
                // Model values changes consisting of whitespaces only are
                // not causing change to be triggered Therefore we've to
                // compare untrimmed version with a trimmed one to check
                // whether anything changed
                // And if yes, we've to trigger change event ourselves
                this.model.trigger('change');
            }
        } else {
            this.handleDestroyClick();
        }

        this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function (e) {
        if (e.which === ENTER_KEY) {
            this.close();
        }
    },

    // If you're pressing `escape` we revert your change by simply leaving
    // the `editing` state.
    revertOnEscape: function (e) {
        if (e.which === ESC_KEY) {
            this.$el.removeClass('editing');
        }
    },

    handleDestroyClick: function () {
        this.model.destroy();
    }
});
