import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createSong: function(e) {
      e.preventDefault();
      var price = this.get('price');
      var title = this.get('songName');
      var createdBy = this.get('createdBy');

      console.log(price, title, createdBy);

      var promise = $.ajax({
        type: 'post',
        url: 'http://itp-api.herokuapp.com/api/songs',
        data: {
          title: title,
          artist: this.get('model.id'),
          genre: 1,
          price: price,
          createdBy: createdBy,
        }
      });

      var controller = this;
      promise.then(function(response){
        controller.set('songName', null);
        controller.set('price', null);
        controller.set('createdBy', null);
        var songs = controller.get('model.songs');
        /*
        var newSongs = songs.concat(response.song);
        this.set('model.songs', newSongs);
        */
        songs.pushObject(response.song);
      }, function() {
        alert('error');
      });

      //OR
/*
      promise.then(() => {
        controller.set('songName', null);
        controller.set('price', null);
        controller.set('createdBy', null);
      }, function() {
        alert('error');
      });
      */
    }
  }
});
