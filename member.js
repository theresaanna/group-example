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

        template: $('#member').html(),

        events: {
            'click .remove': 'remove',
            'click .undo': 'undo'
        },

        remove: function() {
            console.log('hi');
        },

        undo: function() {
            
        },

        render: function(m) {
            var rendered = Handlebars.compile(this.template);
            $(this.el).html(rendered(m.instance));
            return this;
        },
        
        initialize: function() {
            this.bind('add', this.render, this);
            this.bind('reset', this.render, this);
            this.bind('remove', this.render, this);
        }

    });

    var MembersView = Backbone.View.extend({
        collection: Members,

        el: $('#members-list'),

        render: function() {
            this.collection.each(function(member) {
                var memberView = new MemberView({model: Member});
                $(this.el).append(memberView.render({instance: member.attributes}).el);
            }, this);

            return this;
        },

        initialize: function() {
            Members.bind('reset', this.render, this);

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
            else {
                Members.fetch();
            }
        }
    });

    var App = new MembersView;
});

//global
dummyData = [{
        "name": "Person McPersonson",
        "id": "1",
        "photo": "images/avatar2.jpg",
        "bio": "Cupcake ipsum dolor sit amet donut. Donut marshmallow topping caramels. Biscuit candy brownie gingerbread croissant I love.",
        "date": "4/5/10"
    },
    {
        "name": "Spiffy McSpifferson",
        "id": "2",
        "photo": "images/avatar.png",
        "title": "Co-organizer",
        "bio": "Jelly-o dessert biscuit sugar plum. Candy canes lollipop topping muffin soufflé cupcake. Pudding I love I love I love candy canes soufflé dragée.",
        "date": "5/21/11"
    },
    {
        "name": "Mazement Superific",
        "id": "3",
        "photo": "images/avatar.png",
        "bio": "Cupcake ipsum dolor sit amet donut. Donut marshmallow topping caramels. Biscuit candy brownie gingerbread croissant I love.",
        "date": "5/21/11"
    },
    {
        "name": "Ebba Blomqvist",
        "id": "4",
        "photo": "images/avatar2.jpg",
        "bio": "Jelly-o dessert biscuit sugar plum. Candy canes lollipop topping muffin soufflé cupcake. Pudding I love I love I love candy canes soufflé dragée.",
        "date": "5/21/11"
    },
    {
        "name": "Melilot Sackville",
        "id": "5",
        "photo": "images/avatar.png",
        "title": "Organizer",
        "bio": "Cake cheesecake candy canes topping gummies sweet roll.",
        "date": "5/21/11"
    },
    {
        "name": "Gemma Caird",
        "id": "6",
        "photo": "images/avatar2.jpg",
        "bio": "Marshmallow ice cream gummi bears cheesecake pudding dessert.",
        "date": "5/21/11"
    },
    {
        "name": "Carolos Deslauriers",
        "id": "7",
        "photo": "images/avatar.png",
        "bio": "Wafer chocolate wafer.",
        "date": "5/21/11"
    },
    {
        "name": "Damaris Zapata Arenas",
        "id": "8",
        "photo": "images/avatar.png",
        "bio": "Dessert pudding chocolate cake liquorice pudding brownie tiramisu.",
        "date": "5/21/11"
    },
    {
        "name": "Zukatokuchi",
        "id": "9",
        "photo": "images/avatar2.jpg",
        "bio": "Tart pastry chocolate bar bear claw chocolate apple pie toffee bonbon",
        "date": "5/21/11"
    },
    {
        "name": "Fazekas Zsuska",
        "id": "10",
        "photo": "images/avatar2.jpg",
        "bio": "Applicake sugar plum powder gummi bears.",
        "date": "5/21/11"
    }
];
