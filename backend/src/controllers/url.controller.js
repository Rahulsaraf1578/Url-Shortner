const { shorten, resolve } = require('../services/url.service');

const shortenUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'longUrl required' });

    const data = await shorten(longUrl);
    res.json({
      shortUrl: `${req.protocol}://${req.get('host')}/${data.shortCode}`
    });
  } catch (err) {
    next(err);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const longUrl = await resolve(req.params.shortCode);
    if (!longUrl) return res.status(404).json({ error: 'Not found' });

    res.redirect(302, longUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = { shortenUrl, redirectUrl };
