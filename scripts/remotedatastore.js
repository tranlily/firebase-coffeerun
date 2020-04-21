(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore() { 
        this.database = firebase.database();
    }

    RemoteDataStore.prototype.add = function (key, val) { 
        key = key.replace('.', ',')
        console.log(key);
        this.database.ref(key).set(val, function (error) {
            if(error) {
                console.log('Error: ' + error);
            } else {
                console.log('Firebase Database Entry Successful!');
            }
        });
    };

    RemoteDataStore.prototype.getAll = function (cb) { 
        var db = this.database.ref();
        db.on('value', function (snapshot) {
            var orders = {}
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                orders[childKey] = childData;
            });

            console.log(orders);
            cb(orders);
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) { 
        val = this.database.ref(key);
        console.log(val);
        cb(val);
    };

    RemoteDataStore.prototype.remove = function (key) { 
        key = key.replace('.', ',');
        var db_element = this.database.ref(key);
        db_element.remove();
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App; 

}) (window);