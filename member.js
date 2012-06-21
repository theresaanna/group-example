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
        events: {
            'click .remove': 'remove',
            'click .undo': 'undo'
        },

        remove: function() {
            this.model.remove();
        },

        undo: function() {
            
        },

        initialize: function() {
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
        "bio": "Superhero homework meme facepalm freddie mercury joke eat so close. Varius cuteness overload like a boss one does not simply right creepy me gusta in okay."
    },
    {
        "name": "Spiffy McSpifferson",
        "id": "2",
        "photo": "images/avatar.png",
        "title": "Co-organizer",
        "bio": "Vegan bart back all the thingsnius rebecca black."
    },
    {
        "name": "Mazement Superific",
        "id": "3",
        "photo": "images/avatar.png",
        "bio": "Genius megusta really?"
    },
    {
        "name": "Ebba Blomqvist",
        "id": "4",
        "photo": "images/avatar2.jpg",
        "bio": "Really? Nyan cat thor problem?"
    },
    {
        "name": "Melilot Sackville",
        "id": "5",
        "photo": "images/avatar.png",
        "title": "Organizer",
        "bio": "Female phone architect that advaluere people happy bacon diablo. Good guy movie all the things always superhero german win cellphone nap on."
    }
];
