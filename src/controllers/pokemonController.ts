import type { RequestHandler } from 'express';
import Pokemon from '../models/Pokemon.ts';

export const storePokemon: RequestHandler = async (req, res) => {
  try {
    const { userId, ...pokemonData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const existing = await Pokemon.findOne({ userId, name: pokemonData.name });
    if (existing) {
      return res.status(409).json({ message: `${pokemonData.name} already exists for this user` });
    }

    const pokemon = await Pokemon.create({ userId, ...pokemonData });
    res.status(201).json({
      message: `Stored Pokémon ${pokemon.name} for user ${userId}`,
      pokemon
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store Pokémon' });
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
