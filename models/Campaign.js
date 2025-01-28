import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  weekday: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

const campaignSchema = new mongoose.Schema({
  campaignType: { type: String, required: true, enum: ['Cost per Order', 'Cost per Click', 'Buy One Get One'] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  schedule: [scheduleSchema],
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
