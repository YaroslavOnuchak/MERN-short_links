const { Router } = require("express");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");
const router = Router();

router.get(`/:code`, async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }
    res.status(404).json("link doest found");
  } catch (error) {
    res.status(500).json({ message: "something is going wrong" });
  }
});

module.exports = router;
