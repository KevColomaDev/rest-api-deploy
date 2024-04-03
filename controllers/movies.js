import { MovieModel } from '../models/movie.js'
import { ValidateMovie, ValidatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    // Esto es lo que renderiza
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie Not Found' })
  }

  static async create (req, res) {
    const result = ValidateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create(result.data)

    res.status(201).json(newMovie)
  }

  static async updateById (req, res) {
    const result = ValidatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await MovieModel.updateById({ id, input: result.data })

    return res.json(updatedMovie)
  }

  static async deleteById (req, res) {
    const { id } = req.params
    const result = await MovieModel.deleteById({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
