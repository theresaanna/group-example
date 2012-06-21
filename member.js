$(function() {
    var Member = Backbone.Model.extend({
        remove: function() {
            this.destroy();
        }
    });

    // this model doesn't offer persistence beyond
    // the session. removed members are preserved here
    // so that the user can undo an action during
    // the current session.
    var RemovedMember = Backbone.Model.extend({});

    var MemberList = Backbone.Collection.extend({
        model: Member,

        localStorage: new Backbone.LocalStorage("group-members")
    });

    var Members = new MemberList;

    var MemberView = Backbone.View.extend({

        model: Member,

        el: $('.member-list'),

        events: {
            'click .remove': 'remove',
            'click .undo': 'undo'
        },

        remove: function() {
            this.model.remove();
        },

        undo: function() {
            
        },

        render: function() {
            debugger;
        },

        initialize: function() {
            Members.bind('all', this.render, this);

            if (Members.localStorage.records.length === 0) {
                $.each(dummyData, function(i, value) {
                    var member = new Member({
                        name: value.name,
                        id: value.id,
                        photo: value.photo,
                        title: value.title,
                        bio: value.bio
                    });

                    Members.create(member);
                });
            }
        }
    });

    var App = new MemberView;
});

//global
dummyData = [{
        "name": "Person McPersonson",
        "id": "1",
        "photo": "images/avatar2.jpg",
        "bio": "Cupcake ipsum dolor sit amet donut. Donut marshmallow topping caramels. Biscuit candy brownie gingerbread croissant I love."
    },
    {
        "name": "Spiffy McSpifferson",
        "id": "2",
        "photo": "images/avatar.png",
        "title": "Co-organizer",
        "bio": "Jelly-o dessert biscuit sugar plum. Candy canes lollipop topping muffin soufflé cupcake. Pudding I love I love I love candy canes soufflé dragée."
    },
    {
        "name": "Mazement Superific",
        "id": "3",
        "photo": "images/avatar.png",
        "bio": "Cupcake ipsum dolor sit amet donut. Donut marshmallow topping caramels. Biscuit candy brownie gingerbread croissant I love."
    },
    {
        "name": "Ebba Blomqvist",
        "id": "4",
        "photo": "images/avatar2.jpg",
        "bio": "Jelly-o dessert biscuit sugar plum. Candy canes lollipop topping muffin soufflé cupcake. Pudding I love I love I love candy canes soufflé dragée."
    },
    {
        "name": "Melilot Sackville",
        "id": "5",
        "photo": "images/avatar.png",
        "title": "Organizer",
        "bio": "Cake cheesecake candy canes topping gummies sweet roll."
    },
    {
        "name": "Gemma Caird",
        "id": "6",
        "photo": "images/avatar2.png",
        "bio": "Marshmallow ice cream gummi bears cheesecake pudding dessert."
    },
    {
        "name": "Carolos Deslauriers",
        "id": "7",
        "photo": "images/avatar.jpg",
        "bio": "Wafer chocolate wafer."
    },
    {
        "name": "Damaris Zapata Arenas",
        "id": "8",
        "photo": "images/avatar.jpg",
        "bio": "Dessert pudding chocolate cake liquorice pudding brownie tiramisu."
    },
    {
        "name": "Zukatokuchi",
        "id": "9",
        "photo": "images/avatar2.png",
        "bio": "Tart pastry chocolate bar bear claw chocolate apple pie toffee bonbon"
    },
    {
        "name": "Fazekas Zsuska",
        "id": "10",
        "photo": "images/avatar2.jpg",
        "bio": "Applicake sugar plum powder gummi bears."
    }
];
