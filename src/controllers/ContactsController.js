import MovieModel from '../models/MovieModel';

export default {

  list(request, response, next) {
    MovieModel.find().exec()
      .then(movie => {
        return response.json(movie);
      })
      .catch(err => {
        return next(err);
      });
  },

  show(request, response, next) {
    MovieModel.findById(request.params._id).exec()
      .then(movie => {
        return response.json(movie);
      })
      .catch(err => {
        return next(err);
      });
  },

  create(request, response, next) {
    // Create a new instance of our `ContactModel`
    // We are grabbing attributes from our request.body object, again this is set
    // for us because we are using body-parser
    const movie = new MovieModel({
      title: request.body.title,
      poster: request.body.poster,
      overview: request.body.overview,
    });

    // Save the new contact
    movie.save()
      // When the save completes, return the newly created contact
      .then(newMovie => {
        return response.json(newMovie);
      })
      .catch(err => {
        return next(err);
      });
  },

  update(request, response, next) {
    MovieModel.findById(request.params._id)
      .then(movie => {
        // Set the attributes on the model from the request.body OR
        // if we receive nothing, what the contact is already set to
        // this way if we send an update for just the `avatar` field, the name and
        // occupation wont change
        movie.title = request.body.title || movie.title;
        movie.poster = request.body.poster || movie.poster;
        movie.overview = request.body.overview || movie.overview;

        return movie.save();
      })
      .then(movie => {
        return response.json(movie);
      })
      .catch(err => {
        return next(err);
      });
  },

  remove(request, response, next) {
    MovieModel.findByIdAndRemove(request.params._id).exec()
          .then(movie => {
            return response.json(movie);
          })
          .catch(err => {
            return next(err);
          });
  },
};
