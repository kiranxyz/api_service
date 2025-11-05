import { storePokemonSchemaZod } from '../schemas/schemas.ts';
import Pokemon from '../models/pokemonModel.js';

export const storePokemon = async (req, res) => {
  try {
    const parsed = storePokemonSchemaZod.parse(req.body);

    const pokemon = new Pokemon(parsed);
    await pokemon.save();

    res.status(201).json({ message: 'Pokémon stored successfully', pokemon });
  } catch (err) {
    console.error('Error storing Pokémon:', err);
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPokemonByUserId: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const pokemons = await Pokemon.find({ userId });
    if (pokemons.length === 0) {
      return res.status(404).json({ message: `No Pokémon found for user ${userId}` });
    }

    res.json({ userId, pokemons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve Pokémon' });
  }
};
