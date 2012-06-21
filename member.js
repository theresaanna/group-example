$(function() {
    
    var MemberModel = Backbone.Model.extend({
    });

    var Member = new MemberModel;

    var MemberList = Backbone.Collection.extend({
        model: MemberModel,

        localStorage: new Backbone.LocalStorage("group-members")

    });

    var Members = new MemberList;

    var MemberView = Backbone.View.extend({
        collection: Members,

        template: $('#member').html(),

        events: {
            'click .remove': 'kill',
            'click .undo': 'undo'
        },

        kill: function(event) {
            // TODO: record removal feels like a hack... so does template split
            // known bug: if all members are removed, app breaks

            // get id of the member we're removing
            var id = $(event.target).attr('id'),
                recordProperty = 'group-members-' + id;

            // remove this member from localstorage
            localStorage.removeItem(recordProperty);

            // fake template switch to removed message
            // last minute decision not to break this out to 
            // be able to handle undo event in this controller
            this.$el.find('.member').hide();
            this.$el.find('.removed').show();
        },

        undo: function() {
            // fetch id of removed member from dom
            var id = this.$el.find('.undo').attr('id');
            
            // find member to recreate
            // accepts record id and callback data from $.each
            var evaluateData = function(id) {
                    return function(i, value) {
                        if (value.id === id) {
                            Members.create(value);
                        }
                    }
                };
            
            // add this back to the collection
            $.each(dummyData, evaluateData(id));

            // fake readding the template by unhiding it
            this.$el.find('.member').show();
            this.$el.find('.removed').hide();
        },

        render: function(m) {
            var rendered = Handlebars.compile(this.template);
            $(this.el).html(rendered(m.instance));
            return this;
        },
        
        initialize: function() {
            this.bind('add', this.render, this);
            this.bind('reset', this.render, this);
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

        addToCollection: function(value) {
            var member = new MemberModel({
                name: value.name,
                id: value.id,
                photo: value.photo,
                title: value.title,
                bio: value.bio,
                date: value.date
            });

            Members.create(member);
        },

        initialize: function() {
            Members.bind('reset', this.render, this);
            Members.bind('sync', this.render, this);

            if (Members.localStorage.records.length === 0) {
                var self = this;
                $.each(dummyData, function(i, value) {
                    self.addToCollection(value);
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
        "bio": "Jelly-o dessert biscuit sugar plum. Candy canes lollipop topping muffin soufflé cupcake. Pudding I love I love I love candy cane.",
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
        "bio": "Jelly-o dessert biscuit sugar plum. Candy canes lollipop topping muffincupcake. Pudding I love I love I love candy canes.",
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
