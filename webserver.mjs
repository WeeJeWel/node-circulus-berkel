#!/usr/bin/env node

import express from 'express';
import CirculusBerkel from './index.mjs';

const PORT = process.env.PORT ?? 3000;

express()
  .get('/', async (req, res) => {
    const { zipCode } = req.query
    if (!zipCode) {
      return res.status(400).json({ error: 'Missing required parameter zipCode' });
    }

    const { number } = req.query;
    if (!number) {
      return res.status(400).json({ error: 'Missing required parameter number' });
    }

    const { format } = req.query;
    if (!format) {
      return res.status(400).json({ error: 'Missing required parameter format' });
    }

    if (['ical', 'json'].includes(format) === false) {
      return res.status(400).json({ error: 'Invalid format, must be ical or json' });
    }

    const circulusBerkel = new CirculusBerkel({
      zipCode,
      number,
    });

    switch (format) {
      case 'ical': {
        circulusBerkel.getIcalFeed()
          .then(iCalFeed => {
            res.set('Content-Type', 'text/calendar');
            res.send(iCalFeed);
          })
          .catch(error => {
            res.status(500).json({ error: error.message });
          });
        break;
      }
      case 'json': {
        circulusBerkel.getJsonFeed()
          .then(jsonFeed => {
            res.json(jsonFeed);
          })
          .catch(error => {
            res.status(500).json({ error: error.message });
          });
        break;
      }
    }
  }).listen(PORT, () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });