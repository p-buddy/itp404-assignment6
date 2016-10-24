import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createArtist: function(e) {
      e.preventDefault();
      var nameArtist = this.get('artistName');

      console.log(nameArtist);

      var promise = $.ajax({
        type: 'post',
        url: 'http://itp-api.herokuapp.com/api/artists',
        data: {
            name: nameArtist,
        }
      });

      var controller = this;
      promise.then(function(response){
        controller.set('artistName', null);
        var artists = controller.get('model.artists');

        console.log(response);
        /*
        var newSongs = songs.concat(response.song);
        this.set('model.songs', newSongs);
        */
        var artistObject = response.artist;

        artists.pushObject(artistObject);
        console.log(artists);
        controller.transitionToRoute('artists');
      }, function() {
        console.log("Artist already exists!!")
        alert('Error: Artist already exists!!');
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
