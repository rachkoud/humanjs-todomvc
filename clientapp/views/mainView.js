/*global app, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders iteslf on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var HumanView = require('human-view');
var ViewSwitcher = require('human-view-switcher');
var _ = require('underscore');
var templates = require('../templates');
var tracking = require('../helpers/metrics');
var setFavicon = require('favicon-setter');


module.exports = HumanView.extend({
    template: templates.views.bodyView,

    events: {
        'click a[href]': 'handleLinkClick'
    },

    render: function () {
        // some additional stuff we want to add to the document head
        $('head').append(templates.includes.headInclude());

        // main renderer
        this.renderAndBind();

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.getByRole('page-container'), {
            show: function (newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView.pageTitle) || "HumanJS TodoMVC";
                document.scrollTop = 0;

                // add a class specifying it's active
                newView.el.classList.add('active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        // setting a favicon for fun (note, it's dyanamic)
        setFavicon('/images/ampersand.png');
        return this;
    },

    setPage: function (view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);
    },

    handleLinkClick: function (e) {
        var t = $(e.target);
        var aEl = t.is('a') ? t[0] : t.closest('a')[0];
        var local = window.location.host === aEl.host;
        var path = aEl.pathname.slice(1);

        // if the window location host and target host are the
        // same it's local, else, leave it alone
        if (local) {
            app.navigate(path);
            return false;
        }
    }
});
