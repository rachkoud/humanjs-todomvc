var HumanModel = require('human-model');


module.exports = HumanModel.define({
    props: {
        id: ['string'], // Backbone local storage plugin use string (guid) for id
        title: ['string', true, ''],
        completed: ['boolean', true, false],
        order: ['number']
    },
    session: {
//        selected: ['boolean', true, false]
    },
    derived: {
//        fullName: {
//            deps: ['firstName', 'lastName'],
//            fn: function () {
//                return this.firstName + ' ' + this.lastName;
//            }
//        }
    },
    // Toggle the `completed` state of this todo item.
    toggle: function () {
        this.save({
            completed: !this.completed
        });
    }
});
