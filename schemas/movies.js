const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    invalid_type_error: 'Movie poster must be a url'
  }),
  genre: z.array(
    z.enum(['Action', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Triller', 'Sci-Fi']),
    {
      invalid_type_error: 'Movie genre must be a string',
      required_error: 'Movie genre is required'
    }
  ),
  rate: z.number().min(0).max(10)
})
function ValidateMovie (input) {
  return movieSchema.safeParse(input)
}
function ValidatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}
module.exports = {
  ValidateMovie,
  ValidatePartialMovie
}
