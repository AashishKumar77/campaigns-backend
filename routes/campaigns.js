import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create campaign', error });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const campaignId = req.params.id;
      // Attempt to find and delete the campaign by its ID
      const campaign = await Campaign.findByIdAndDelete(campaignId);
      
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
      
      return res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err });
    }
  });

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve campaigns', error });
  }
});

// Update a campaign by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCampaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update campaign', error });
  }
});

export default router;
