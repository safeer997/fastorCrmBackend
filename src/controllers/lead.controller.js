import { Lead } from '../models/lead.model.js';
import mongoose from 'mongoose';

export async function createLead(req, res) {
  const { name, email, phone, courseInterest } = req.body;

  if (!name || !email || !phone || !courseInterest) {
    return res.status(401).json({
      success: false,
      message: 'all fieleds of enquiry form are required',
    });
  }

  try {
    const newLead = {
      name: name,
      email: email,
      phone: phone,
      courseInterest: courseInterest,
    };

    const createLead = await Lead.create(newLead);

    if (!createLead) {
      return res.status(401).json({
        success: false,
        message: 'Error while creating lead in DB',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully!',
      data: createLead,
    });
  } catch (error) {
    console.log('lead create err', error);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}

export async function getUnclaimedLeads(req, res) {
  try {
    const leads = await Lead.find({ claimedBy: null });

    return res.status(200).json({
      success: true,
      message: 'unclaimed leads fetched',
      data: leads,
    });
  } catch (error) {
    console.log('something went worng while getting unclaimed leads !', error);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}

export async function claimLead(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'invalid id format',
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'lead not found',
      });
    }

    if (lead.claimedBy) {
      return res.status(400).json({
        success: false,
        message: 'lead already claimed by someone',
      });
    }

    lead.claimedBy = userId;
    lead.claimedAt = new Date();

    await lead.save();

    return res.status(200).json({
      success: true,
      message: 'lead claimed successfully',
      data: lead,
    });
  } catch (error) {
    console.log('something went worng while getting claiming the lead!', error);
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}

export async function getMyLeads(req, res) {
  const userId = req.user.id;

  try {
    const myLeads = await Lead.find({ claimedBy: userId });

    return res.status(200).json({
      success: true,
      message: 'claimed leads fetched',
      data: myLeads,
    });
  } catch (error) {
    console.log(
      'something went worng while getting single user leads !',
      error
    );
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
}
